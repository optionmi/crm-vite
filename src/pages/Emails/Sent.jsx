import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Nav, Table } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import emailAPI from "../../api/emailAPI";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

export default function Sent() {
    const { authToken } = useContext(AuthContext);
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { emails } = await emailAPI.getSentEmails(authToken);
                setEmails(emails);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // Delete Email
    const [notification, setNotification] = useState({
        type: "",
        message: "",
        show: false,
    });

    const handleDelete = async (emailID) => {
        try {
            const data = await emailAPI.deleteEmailById(authToken, emailID);
            // console.log(data);
            if (data.resType === "success") {
                setEmails((prevEmails) =>
                    prevEmails.filter((email) => email.id !== emailID)
                );
            }
            setNotification({
                type: data.resType,
                message: data.message,
                show: true,
            });
        } catch (error) {
            console.error("Error deleting Email:", error);
        }
    };
    // End of Delete Email

    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <div className="d-flex justify-content-between my-2 align-items-center">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                Emails
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                Sent
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="d-flex justify-content-center gap-4">
                    <Nav className="flex-column justify-content-start align-items-center gap-3">
                        <Nav.Item>
                            <Link to="/emails/inbox">Inbox</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/emails/sent" className="btn btn-primary">
                                Sent
                            </Link>
                        </Nav.Item>
                    </Nav>
                    <Card className="col-lg-8 col-md-10 col-sm-12">
                        <Card.Header>
                            <Card.Title className="fw-bold">Sent</Card.Title>
                        </Card.Header>
                        <Card.Body className="d-flex flex-column gap-2">
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>To</th>
                                        <th>Subject</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emails.map((email) => (
                                        <tr>
                                            <td>{email.to}</td>
                                            <td>{email.subject}</td>
                                            <td className="d-flex gap-3">
                                                <Link
                                                    to={`/emails/view-email/${email.id}`}
                                                    className="btn btn-sm btn-success"
                                                >
                                                    View
                                                </Link>
                                                <DeleteConfirmationModal
                                                    handleDelete={() =>
                                                        handleDelete(email.id)
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
            </main>
        </>
    );
}
