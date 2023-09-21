import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

function Series() {
    let { authToken } = useContext(AuthContext);
    const [series, setSeries] = useState([]);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="series">
                <div className="header d-flex justify-content-between">
                    <h4>Series</h4>
                    <Link
                        className="btn btn-primary create-btn"
                        to="/create/series"
                    >
                        Create Series
                    </Link>
                </div>
                {/* Series Header */}
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h5>Name</h5>
                            </div>
                            <div className="col-6">
                                <h5>Subject</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        {series.map((series) => (
                            <div
                                className="card"
                                id="detail-card"
                                key={series.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6>{series.name}</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6>{series.subject_id}</h6>
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

export default Series;
