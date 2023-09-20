import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import salespersonAPI from "../../api/salesPersonAPI";
import AuthContext from "../../context/AuthContext";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ViewSalesperson() {
    let { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [Message, setMessage] = useState(null);

    const [salesperson, setSalesperson] = useState({
        name: "",
        email: "",
        phone_number: "",
        team: "",
    });

    useEffect(() => {
        // Fetch the salesperson by ID when the component mounts
        salespersonAPI
            .getSalespersonById(authToken, id)
            .then((data) => {
                setSalesperson(data);
            })
            .catch((error) => {
                console.error("Error fetching salesperson:", error);
            });
    }, [authToken, id]);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="salesperson">
                <div className="header d-flex justify-content-between">
                    <h4>View Salesperson</h4>
                    <button className="btn btn-primary create-btn" disabled>
                        Delete Salesperson
                    </button>
                </div>

                <Card
                    className="create-salesperson-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-salesperson-card-body">
                        {Message && (
                            <Alert variant="success" className="mb-3">
                                {Message}
                            </Alert>
                        )}
                        <Form className="create-salesperson-form">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="company-name"
                                        className="create-salesperson-form-group"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="text"
                                            value={salesperson.name}
                                            name="company_name"
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="email"
                                        className="create-salesperson-form-group"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="email"
                                            value={salesperson.email}
                                            name="email"
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="phone-number"
                                        className="create-salesperson-form-group"
                                    >
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="number"
                                            value={salesperson.phone_number}
                                            name="phone_number"
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="phone-number"
                                        className="create-salesperson-form-group"
                                    >
                                        <Form.Label>Team</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="text"
                                            value={salesperson.team}
                                            name="team"
                                            required
                                            disabled
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="create-form-btn">
                                <Button
                                    disabled
                                    variant="primary"
                                    type="submit"
                                    className="w-100 create-salesperson-form-group create-salesperson-button"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default ViewSalesperson;
