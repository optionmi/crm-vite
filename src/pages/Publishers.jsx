import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import publishersApi from "../api/publisherAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Card, Table } from "react-bootstrap";

function Publishers() {
    let { authToken } = useContext(AuthContext);
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        // Fetch publishers when the component mounts
        publishersApi
            .getAllPublishers(authToken)
            .then((data) => {
                setPublishers(data);
            })
            .catch((error) => {
                console.error("Error fetching publishers:", error);
            });
    }, []);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="publisher">
                <div className="header d-flex justify-content-between">
                    <h4>Publishers</h4>
                    <Link
                        className="btn btn-primary create-btn"
                        to="/create/publisher"
                    >
                        Create Publisher
                    </Link>
                </div>
                {/* Publisher Header */}
                <Card>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {publishers?.map((publisher, index) => (
                                    <tr key={publisher.id}>
                                        <td>{index + 1}</td>
                                        <td>{publisher.company_name}</td>
                                        <td>{publisher.address}</td>
                                        <td>{publisher.phone_number}</td>
                                        <td className="col-3">
                                            <Link
                                                className="view-link"
                                                to={`/publisher/view/${publisher.id}`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    id="eye-icon"
                                                />
                                            </Link>
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

export default Publishers;
