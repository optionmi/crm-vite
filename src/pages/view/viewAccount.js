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
            <div className="account">
                <div className="header d-flex justify-content-between">
                    <h4>Manage Account</h4>
                </div>

                <Card
                    className="manage-account-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="manage-account-card-body">
                        <Form className="manage-account-form">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="company-name"
                                        className="manage-account-form-group"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            className="form-contol text-capitalize"
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
                                        className="manage-account-form-group"
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
                                        className="manage-account-form-group"
                                    >
                                        <Form.Label>User Type</Form.Label>
                                        <Form.Control
                                            className="form-contol text-capitalize"
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
