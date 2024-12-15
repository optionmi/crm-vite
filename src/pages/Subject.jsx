import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import subjectAPI from "../api/subjectAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

function Subject() {
    const { authToken } = useContext(AuthContext);
    const [subjects, setSubjects] = useState([]);
    const [notification, setNotification] = useState({
        type: "",
        message: "",
        show: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await subjectAPI.getAllSubject(authToken);
                setSubjects(data);
            } catch (error) {
                console.error("Error fetching Subjects:", error);
            }
        };
        fetchData();
    }, [authToken]);

    const handleDelete = async (subjectID) => {
        try {
            const data = await subjectAPI.deleteSubjectByID(
                subjectID,
                authToken
            );
            setNotification({
                type: data.resType,
                message: data.message,
                show: true,
            });
            if (data.resType === "success") {
                setSubjects((prevSubjects) =>
                    prevSubjects.filter((subject) => subject.id !== subjectID)
                );
            }
        } catch (error) {
            console.error("Error deleting Subject:", error);
        }
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="subject">
                <div className="header d-flex justify-content-between">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                Subjects
                            </li>
                        </ol>
                    </nav>
                    <Link
                        className="btn btn-primary create-btn"
                        to="/create/subject"
                    >
                        Create Subject
                    </Link>
                </div>
                <Card>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>#</th>
                                    <th style={{ width: "60%" }}>Subject</th>
                                    <th style={{ width: "30%" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map((subject, index) => (
                                    <tr key={subject.id}>
                                        <td>{index + 1}</td>
                                        <td>{subject.name}</td>
                                        <td className="d-flex gap-3">
                                            <Link
                                                className="btn btn-sm btn-success"
                                                to={`/update-subject/${subject.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <DeleteConfirmationModal
                                                handleDelete={() =>
                                                    handleDelete(subject.id)
                                                }
                                                notification={notification}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
export default Subject;
