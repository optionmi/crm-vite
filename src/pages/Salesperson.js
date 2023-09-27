import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import salespersonApi from "../api/salesPersonAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

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

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-3">
                                <h5>Name</h5>
                            </div>
                            <div className="col-3">
                                <h5>Phone</h5>
                            </div>
                            <div className="col-3">
                                <h5>Team</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        {salesPersons?.map((salesPerson) => (
                            <div
                                className="card"
                                id="detail-card"
                                key={salesPerson.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-3">
                                            <h6>{salesPerson.name}</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6>{salesPerson.phone_number}</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6>{salesPerson.team}</h6>
                                        </div>
                                        <div className="col-3">
                                            <Link
                                                className="view-link"
                                                to={`/salesperson/view/${salesPerson.id}`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    id="eye-icon"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Salesperson;
