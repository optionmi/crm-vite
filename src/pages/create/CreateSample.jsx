import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button } from "react-bootstrap";
import booksAPI from "../../api/booksAPI";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateSample() {
    let { authToken } = useContext(AuthContext);
    const [booksId, setBooksId] = useState([]);

    useEffect(() => {
        booksAPI
            .getAllBooks(authToken)
            .then((data) => {
                setBooksId(data.id);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
            });
    }, []);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="sample">
                <h4>Create Sample</h4>
                <Card
                    className="create-sample-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-sample-card-body">
                        <Form className="create-sample-form">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="description"
                                        className="create-sample-form-group"
                                    >
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="text"
                                            placeholder="Description"
                                            name="description"
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-12">
                                <Form.Group className="create-sample-form-group">
                                    <Form.Label>Book Id</Form.Label>
                                    <Form.Control as="select">
                                        <option value="">
                                            Select a Book Id
                                        </option>
                                        {booksId?.map((book) => (
                                            <option key={book} value={book}>
                                                {book}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>

                            <div className="create-form-btn">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 create-sample-form-group create-sample-button"
                                >
                                    Create Sample
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CreateSample;
