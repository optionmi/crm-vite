import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import SearchSelect from "../../../components/SearchSelect";
import { useContext, useEffect, useState } from "react";
import salespersonAPI from "../../../api/salesPersonAPI";
import AuthContext from "../../../context/AuthContext";
import contactsAPI from "../../../api/contactsAPI";
import leadsAPI from "../../../api/leadsAPI";

export default function QuoteInformation({ formData, setFormData }) {
    const { authToken } = useContext(AuthContext);

    // Sales Owner
    const [salesOwnerOptions, setSalesOwnerOptions] = useState([]);
    const [salesOwnerInputValue, setSalesOwnerInputValue] = useState("");
    const [salesOwners, setSalesOwners] = useState([]);
    const [selectedSalesOwner, setSelectedSalesOwner] = useState([]);

    useEffect(() => {
        if (salesOwnerInputValue) {
            salespersonAPI
                .getSalespersonByName(authToken, salesOwnerInputValue)
                .then((data) => {
                    const salesOwnerOptions = data.salespersons?.map(
                        (item, index) => ({
                            value: item.id,
                            label: item.name,
                            index: index,
                        })
                    );
                    setSalesOwnerOptions(salesOwnerOptions);
                    setSalesOwners(data.salespersons);
                });
        }
    }, [salesOwnerInputValue]);

    const handleSalesOwnerInputChange = (value) => {
        setSalesOwnerInputValue(value);
    };

    const handleSalesOwnerChange = (selectedOption) => {
        setSelectedSalesOwner(salesOwners[selectedOption.index]);
        setFormData({
            ...formData,
            salesperson_id: parseInt(salesOwners[selectedOption.index].id),
        });
    };
    // End Sales Owner

    // Contact Person
    const [contactOptions, setContactOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState([]);

    useEffect(() => {
        if (inputValue) {
            contactsAPI.getContactByName(authToken, inputValue).then((data) => {
                const contactOptions = data.contacts?.map((item, index) => ({
                    value: item.id,
                    label: item.name,
                    index: index,
                }));
                setContactOptions(contactOptions);
                setContacts(data.contacts);
            });
        }
    }, [inputValue]);

    const handleContactInputChange = (value) => {
        setInputValue(value);
    };

    const handleContactChange = (selectedOption) => {
        setSelectedContact(contacts[selectedOption.index]);
        setFormData({
            ...formData,
            contact_person_id: parseInt(contacts[selectedOption.index].id),
            organization_id: parseInt(
                contacts[selectedOption.index].organization?.id
            ),
        });
    };
    // End Contact Person

    // Leads
    const [leadOptions, setLeadOptions] = useState([]);
    const [leadInputValue, setLeadInputValue] = useState("");
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState([]);

    useEffect(() => {
        if (leadInputValue) {
            leadsAPI.getLeadByName(authToken, leadInputValue).then((data) => {
                const leadOptions = data.leads?.map((item, index) => ({
                    value: item.id,
                    label: item.client_name,
                    index: index,
                }));
                setLeadOptions(leadOptions);
                setLeads(data.leads);
            });
        }
    }, [leadInputValue]);

    const handleLeadInputChange = (value) => {
        setLeadInputValue(value);
    };

    const handleLeadChange = (selectedOption) => {
        setSelectedLead(leads[selectedOption.index]);
        setFormData({
            ...formData,
            lead_id: parseInt(leads[selectedOption.index].id),
            // lead: {
            //     id: parseInt(leads[selectedOption.index].id),
            //     client_name: leads[selectedOption.index].label,
            // },
        });
    };
    // End Leads

    // console.log(formData);

    const formatted_date = (dateString) => {
        if (!dateString) {
            return "";
        }
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
        const day = ("0" + date.getUTCDate()).slice(-2);
        const hours = ("0" + date.getUTCHours()).slice(-2);
        const minutes = ("0" + date.getUTCMinutes()).slice(-2);
        return year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
    };

    return (
        <div className="d-flex flex-column gap-3">
            <FormGroup>
                <FormLabel>Sales Owner</FormLabel>
                {formData.salesperson ? (
                    <SearchSelect
                        value={{
                            value: formData.salesperson?.id,
                            label: formData.salesperson?.name,
                        }}
                        options={salesOwnerOptions}
                        onChange={handleSalesOwnerChange}
                        onInputChange={handleSalesOwnerInputChange}
                    />
                ) : (
                    <SearchSelect
                        options={salesOwnerOptions}
                        onChange={handleSalesOwnerChange}
                        onInputChange={handleSalesOwnerInputChange}
                    />
                )}
            </FormGroup>

            <FormGroup>
                <FormLabel>Subject</FormLabel>
                <FormControl
                    value={formData?.subject}
                    onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                    }
                ></FormControl>
            </FormGroup>

            <FormGroup>
                <FormLabel>Description</FormLabel>
                <FormControl
                    value={formData?.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                ></FormControl>
            </FormGroup>

            <FormGroup>
                <FormLabel>Expired At</FormLabel>
                <FormControl
                    type="datetime-local"
                    value={formatted_date(formData?.expired_at)}
                    onChange={(e) =>
                        setFormData({ ...formData, expired_at: e.target.value })
                    }
                ></FormControl>
            </FormGroup>

            <FormGroup>
                <FormLabel>Contact Person</FormLabel>
                {formData.contact ? (
                    <SearchSelect
                        value={{
                            value: formData.contact?.id,
                            label: formData.contact?.name,
                        }}
                        options={contactOptions}
                        onChange={handleContactChange}
                        onInputChange={handleContactInputChange}
                    />
                ) : (
                    <SearchSelect
                        options={contactOptions}
                        onChange={handleContactChange}
                        onInputChange={handleContactInputChange}
                    />
                )}
            </FormGroup>

            <FormGroup>
                <FormLabel>Lead</FormLabel>
                {formData.lead ? (
                    <SearchSelect
                        value={{
                            value: formData?.lead?.id,
                            label: formData?.lead?.client_name,
                        }}
                        options={leadOptions}
                        onChange={handleLeadChange}
                        onInputChange={handleLeadInputChange}
                    />
                ) : (
                    <SearchSelect
                        options={leadOptions}
                        onChange={handleLeadChange}
                        onInputChange={handleLeadInputChange}
                    />
                )}
            </FormGroup>
        </div>
    );
}
