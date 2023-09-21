import React, { useContext } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button } from "react-bootstrap";
import subjectAPI from "../../api/subjectAPI";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateSubject() {
    let { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleCreateSubjects = (e) => {
        e.preventDefault();
        const subjectData = {
            name: e.target.name.value,
        };

        subjectAPI
            .createSubject(subjectData, authToken)
            .then(() => {
                navigate("/subjects");
            })
            .catch((error) => {
                console.error("Error creating Subject:", error);
            });
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="subject">
                <h4>Create Subject</h4>
                <Card
                    className="create-subject-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-subject-card-body">
                        <Form
                            className="create-subject-form"
                            onSubmit={handleCreateSubjects}
                        >
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="name"
                                        className="create-subject-form-group"
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

                            <div className="create-form-btn">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 create-subject-form-group create-subject-button"
                                >
                                    Create Subject
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CreateSubject;
