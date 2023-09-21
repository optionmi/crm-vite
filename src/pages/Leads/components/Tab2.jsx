import { Card, Form, Tab } from "react-bootstrap";
import { useState } from "react";
import { useEffect, useContext } from "react";
import contactsAPI from "../../../api/contactsAPI";
import AuthContext from "../../../context/AuthContext";
import SearchSelect from "../../../components/SearchSelect";

export default function Tab2({ formData, setFormData }) {
    let { authToken } = useContext(AuthContext);

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
        // console.log(`Option selected:`, selectedOption);
        setSelectedContact(contacts[selectedOption.index]);
        // console.log(contacts[selectedOption.index]);
        // console.log(selectedContact);
        setFormData({
            ...formData,
            contact_person_id: parseInt(contacts[selectedOption.index].id),
            organization_id: parseInt(
                contacts[selectedOption.index].organization.id
            ),
        });
    };
    // End Contact Person

    return (
        <Card
            className="shadow-sm p-4"
            style={{
                background: "white",
                height: "fit-content",
            }}
        >
            <Card.Body className="">
                <div className="row gap-4">
                    <div className="col-12">
                        <Form.Label>Name</Form.Label>
                        <SearchSelect
                            options={contactOptions}
                            onChange={handleContactChange}
                            onInputChange={handleContactInputChange}
                        />
                    </div>

                    {selectedContact.emails?.map((email) => (
                        <div className="col-12" key={email.id}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    defaultValue={email.email}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                    ))}

                    {selectedContact.contact_numbers?.map((number) => (
                        <div className="col-12" key={number.id}>
                            <Form.Group>
                                <Form.Label>Contact Numbers</Form.Label>
                                <Form.Control
                                    defaultValue={number.number}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                    ))}
                    {selectedContact.organization ? (
                        <div className="col-12">
                            <Form.Group>
                                <Form.Label>Organization</Form.Label>
                                <Form.Control
                                    defaultValue={
                                        selectedContact.organization.name
                                    }
                                ></Form.Control>
                            </Form.Group>
                        </div>
                    ) : null}
                </div>
            </Card.Body>
        </Card>
    );
}
