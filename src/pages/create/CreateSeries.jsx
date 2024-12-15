import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import subjectAPI from "../../api/subjectAPI";
import seriesAPI from "../../api/seriesAPI";

function CreateSeries() {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const { seriesID } = useParams();

    const [subjects, setSubjects] = useState([]);
    const [seriesData, setSeriesData] = useState({ name: "", subject_id: "" });

    useEffect(() => {
        if (seriesID) {
            seriesAPI
                .getSeriesByID(seriesID, authToken)
                .then((data) => {
                    setSeriesData(data);
                })
                .catch((error) => {
                    console.error("Error fetching Series:", error);
                });
        }

        const fetchData = async () => {
            try {
                const data = await subjectAPI.getAllSubject(authToken);
                setSubjects(data);
            } catch (error) {
                console.error("Error fetching Subjects:", error);
            }
        };
        fetchData();
    }, [seriesID]);

    const handleCreateSeriesSubmit = async (e) => {
        e.preventDefault();
        try {
            await seriesAPI.createSeries(seriesData, authToken);
            navigate("/series");
        } catch (error) {
            console.error("Error creating Series:", error);
        }
    };

    const handleUpdateSeriesSubmit = async (e) => {
        e.preventDefault();
        try {
            await seriesAPI.updateSeriesByID(seriesID, seriesData, authToken);
            navigate("/series");
        } catch (error) {
            console.error("Error updating Series:", error);
        }
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="series">
                <h4>{seriesID ? "Update" : "Create"} Series</h4>
                <Card
                    className="create-series-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-series-card-body">
                        <Form
                            className="create-series-form"
                            onSubmit={
                                seriesID
                                    ? handleUpdateSeriesSubmit
                                    : handleCreateSeriesSubmit
                            }
                        >
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group className="create-series-form-group">
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={seriesData.subject_id}
                                            onChange={(e) =>
                                                setSeriesData((prevData) => ({
                                                    ...prevData,
                                                    subject_id: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="">
                                                Select Subject
                                            </option>
                                            {subjects.map((subject) => (
                                                <option
                                                    key={subject.id}
                                                    value={subject.id}
                                                >
                                                    {subject.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="name"
                                        className="create-series-form-group"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            required
                                            value={seriesData.name}
                                            onChange={(e) =>
                                                setSeriesData((prevData) => ({
                                                    ...prevData,
                                                    name: e.target.value,
                                                }))
                                            }
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="create-form-btn">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 create-series-form-group create-series-button"
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
export default CreateSeries;
