import React, { useContext } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button } from "react-bootstrap";
import attendanceAPI from "../../api/attendanceAPI";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateAttendance() {
    let { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const date = new Date().toISOString().split("T")[0];

    const handleCreateAttendance = (e) => {
        e.preventDefault();
        const attendanceData = {
            is_present: e.target.is_present.value,
        };

        attendanceAPI
            .createAttendance(attendanceData, authToken)
            .then(() => {
                console.log("Marked !!!");
                // navigate('/attendance')
            })
            .catch((error) => {
                console.error("Error creating Attendance:", error);
            });
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="attendance">
                <h4>Mark Attendance</h4>
                <Card
                    className="create-attendance-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-attendance-card-body">
                        <Form
                            className="create-attendance-form"
                            onSubmit={handleCreateAttendance}
                        >
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="date"
                                        className="create-attendance-form-group"
                                    >
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="text"
                                            value={date}
                                            name="date"
                                            disabled
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group className="create-attendance-form-group">
                                        <Form.Label>Is Present</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="is_present"
                                        >
                                            <option value="Present">
                                                Present
                                            </option>
                                            <option value="Absent">
                                                Absent
                                            </option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="create-form-btn">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 create-attendance-form-group create-attendance-button"
                                >
                                    Mark Attendance
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CreateAttendance;
