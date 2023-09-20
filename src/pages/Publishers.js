import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import publishersApi from "../api/publisherAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

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
                    <a
                        className="btn btn-primary create-btn"
                        href="/create/publisher"
                    >
                        Create Publisher
                    </a>
                </div>
                {/* Publisher Header */}
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-3">
                                <h5>Name</h5>
                            </div>
                            <div className="col-3">
                                <h5>Address</h5>
                            </div>
                            <div className="col-3">
                                <h5>Phone Number</h5>
                            </div>
                            <div className="col-3">
                                <h5>View Publisher</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        {/* Publisher data */}

                        {publishers.map((publisher) => (
                            <div
                                className="card"
                                id="detail-card"
                                key={publisher.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-3">
                                            <h6>{publisher.company_name}</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6>{publisher.address}</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6>{publisher.phone_number}</h6>
                                        </div>
                                        <div className="col-3">
                                            <Link
                                                className="view-link"
                                                to={`/publisher/view/${publisher.id}`}
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

export default Publishers;
