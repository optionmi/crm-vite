import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import salespersonApi from "../api/salesPersonAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Card, Table } from "react-bootstrap";

function Salesperson() {
    let { authToken } = useContext(AuthContext);
    const [salesPersons, setsalesPersons] = useState([]);

    useEffect(() => {
        // Fetch salesperson when the component mounts
        salespersonApi
            .getAllSalespersons(authToken)
            .then((data) => {
                setsalesPersons(data);
            })
            .catch((error) => {
                console.error("Error fetching Sales Person:", error);
            });
    }, []);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="salesperson">
                <div className="header d-flex justify-content-between">
                    <h4>Salesperson</h4>
                    <Link
                        className="btn btn-primary create-btn"
                        to="/create/salesperson"
                    >
                        Create Salesperson
                    </Link>
                </div>

                <Card>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Team</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesPersons?.map((salesPerson, index) => (
                                    <tr key={salesPerson.id}>
                                        <td>{index + 1}</td>
                                        <td>{salesPerson.name}</td>
                                        <td>{salesPerson.phone_number}</td>
                                        <td>{salesPerson.team}</td>
                                        <td className="col-3">
                                            <Link
                                                className="view-link"
                                                to={`/salesperson/view/${salesPerson.id}`}
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

export default Salesperson;
