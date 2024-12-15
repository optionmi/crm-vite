import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import salespersonAPI from "../api/salesPersonAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { Card, Table } from "react-bootstrap";

function Location() {
    let { authToken } = useContext(AuthContext);
    const [salesPersons, setsalesPersons] = useState([]);

    useEffect(() => {
        // Fetch salesperson when the component mounts
        salespersonAPI
            .getSalespersonByTeam(authToken)
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
            <div className="location">
                <div className="header d-flex justify-content-between">
                    <h4>Location</h4>
                </div>
                {/* Location Header */}
                <Card>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th style={{ width: "10%" }}>#</th>
                                <th style={{ width: "60%" }}>Name</th>
                                <th style={{ width: "30%" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesPersons?.map((salesPerson, index) => (
                                <tr key={salesPerson.id}>
                                    <td>{index + 1}</td>
                                    <td>{salesPerson.name}</td>
                                    <td>
                                        <Link
                                            className="view-link"
                                            to={`/view/location/${salesPerson.id}`}
                                            title="View"
                                        >
                                            <FontAwesomeIcon
                                                icon={faMap}
                                                id="map-icon"
                                            />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}

export default Location;
