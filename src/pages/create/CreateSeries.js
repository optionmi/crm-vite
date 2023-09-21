import React, { useContext } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateSeries() {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="series">
                <h4>Create Series</h4>
                <Card
                    className="create-series-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-series-card-body">
                        <Form className="create-series-form">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="name"
                                        className="create-series-form-group"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-12">
                                <Form.Group className="create-series-form-group">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control as="select">
                                        <option value="">
                                            Select a Subject Id
                                        </option>
                                    </Form.Control>
                                </Form.Group>
                            </div>

                            <div className="create-form-btn">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 create-series-form-group create-series-button"
                                >
                                    Create Series
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CreateSeries;
