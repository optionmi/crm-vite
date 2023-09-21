import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import claimAPI from "../api/claimAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

function Claim() {
    let { authToken } = useContext(AuthContext);
    const [Claim, setClaim] = useState([]);

    useEffect(() => {
        claimAPI
            .getAllClaim(authToken)
            .then((data) => {
                setClaim(data);
            })
            .catch((error) => {
                console.error("Error fetching claim:", error);
            });
    }, []);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="claim">
                <div className="header d-flex justify-content-between">
                    <h4>Travelling Claim</h4>
                    <Link
                        className="btn btn-primary create-btn"
                        to="/create/travelling-claim"
                    >
                        Create Claim
                    </Link>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-3">
                                <h5>Date</h5>
                            </div>
                            <div className="col-3">
                                <h5>Description</h5>
                            </div>
                            <div className="col-3">
                                <h5>Amount</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        {Claim.map((claim) => (
                            <div
                                className="card"
                                id="detail-card"
                                key={claim.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-3">
                                            <h6>{claim.claim_date}</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6>{claim.claim_description}</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6>{claim.amount}</h6>
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

export default Claim;
