import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button } from "react-bootstrap";
import subjectAPI from "../../api/subjectAPI";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function CreateSubject() {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const { subjectID } = useParams();
    const [subjectData, setSubjectData] = useState({ name: "" });

    useEffect(() => {
        if (subjectID) {
            subjectAPI
                .getSubjectByID(subjectID, authToken)
                .then((data) => {
                    setSubjectData(data);
                })
                .catch((error) => {
                    console.error("Error fetching Subject:", error);
                });
        }
    }, []);

    const handleCreateSubjects = (e) => {
        e.preventDefault();
        subjectAPI
            .createSubject(subjectData, authToken)
            .then(() => {
                navigate("/subjects");
            })
            .catch((error) => {
                console.error("Error creating Subject:", error);
            });
    };

    const handleUpdateSubjectSubmit = (e) => {
        e.preventDefault();
        subjectAPI
            .updateSubjectByID(subjectID, subjectData, authToken)
            .then(() => {
                navigate("/subjects");
            })
            .catch((error) => {
                console.error("Error updating Subject:", error);
            });
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="subject">
                <h4>{subjectID ? "Update" : "Create"} Subject</h4>
                <Card
                    className="create-subject-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-subject-card-body">
                        <Form
                            className="create-subject-form"
                            onSubmit={
                                subjectID
                                    ? handleUpdateSubjectSubmit
                                    : handleCreateSubjects
                            }
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
                                            value={subjectData?.name}
                                            onChange={(e) =>
                                                setSubjectData({
                                                    ...subjectData,
                                                    name: e.target.value,
                                                })
                                            }
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
                                    Save
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
