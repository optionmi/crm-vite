import React, { useContext } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import AuthContext from "../../context/AuthContext";
import { Card, Form } from "react-bootstrap";

function ViewAccount() {
    let { Name, User_type, Email } = useContext(AuthContext);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="publisher">
                <div className="header d-flex justify-content-between">
                    <h4>Manage Account</h4>
                </div>

                <Card
                    className="create-publisher-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-publisher-card-body">
                        <Form className="create-publisher-form">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="company-name"
                                        className="create-publisher-form-group"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="text"
                                            value={Name}
                                            required
                                            disabled
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="email"
                                        className="create-publisher-form-group"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="email"
                                            value={Email}
                                            name="email"
                                            required
                                            disabled
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="phone-number"
                                        className="create-publisher-form-group"
                                    >
                                        <Form.Label>User</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="text"
                                            value={User_type}
                                            required
                                            disabled
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default ViewAccount;
