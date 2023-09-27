import { Card, Form, Tab } from "react-bootstrap";
import salespersonAPI from "../../../api/salesPersonAPI";
import SearchSelect from "../../../components/SearchSelect";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";

export default function Tab1({ formData, setFormData }) {
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
        // console.log(`Option selected:`, selectedOption);
        setSelectedSalesOwner(salesOwners[selectedOption.index]);
        // console.log(contacts[selectedOption.index]);
        // console.log(selectedContact);
        setFormData({
            ...formData,
            salesperson_id: parseInt(salesOwners[selectedOption.index].id),
        });
    };
    // End Sales Owner

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
                        <Form.Group
                            controlId="company-name"
                            className="create-lead-form-group"
                        >
                            <Form.Label>Client Name</Form.Label>
                            <Form.Control
                                className="form-contol"
                                type="text"
                                placeholder="Client Name"
                                name="client_name"
                                value={formData.client_name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        client_name: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>
                    </div>

                    <div className="col-12">
                        <Form.Group
                            controlId="company-name"
                            className="create-lead-form-group"
                        >
                            <Form.Label>Requirement</Form.Label>
                            <Form.Control
                                as="textarea"
                                className="form-contol"
                                type="text"
                                placeholder="Requirement"
                                name="requirement"
                                value={formData.requirement}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        requirement: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>
                    </div>

                    <div className="col-12">
                        <Form.Group
                            controlId="postal-code"
                            className="create-lead-form-group"
                        >
                            <Form.Label>
                                Lead Budget
                                <span className="currency-code">(₹)</span>
                            </Form.Label>
                            <Form.Control
                                className="form-contol"
                                type="number"
                                placeholder="Lead Budget"
                                name="budget"
                                value={formData.budget}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        budget: parseFloat(e.target.value),
                                    })
                                }
                                required
                            />
                        </Form.Group>
                    </div>

                    <div className="col-12">
                        <Form.Group>
                            <Form.Label>Source</Form.Label>
                            <Form.Control
                                as="select"
                                value={formData.source}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        source: e.target.value,
                                    })
                                }
                            >
                                <option value="">Select a source</option>
                                <option value="DIRECT">Direct</option>
                                <option value="EMAIL">Email</option>
                                <option value="PHONE">Phone</option>
                                <option value="WEB">Web</option>
                                <option value="WHATSAPP">Whatsapp</option>
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div className="col-12">
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={formData.type}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        type: e.target.value,
                                    })
                                }
                            >
                                <option value="">Select Lead Type</option>
                                <option value="NEW_INVENTORY">
                                    New Inventory
                                </option>
                                <option value="RESALE">Resale</option>
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div className="col-12">
                        <Form.Group>
                            <Form.Label>Sales Owner</Form.Label>
                            <SearchSelect
                                defaultValue={{
                                    value: formData?.salesperson?.id,
                                    label: formData?.salesperson?.name,
                                }}
                                options={salesOwnerOptions}
                                onChange={handleSalesOwnerChange}
                                onInputChange={handleSalesOwnerInputChange}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-12">
                        <Form.Group>
                            <Form.Label>Expected Close Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.expected_close_date}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        expected_close_date: e.target.value,
                                    })
                                }
                            ></Form.Control>
                        </Form.Group>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
