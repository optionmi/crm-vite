import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import subjectAPI from "../api/subjectAPI";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

function Subject() {
    let { authToken } = useContext(AuthContext);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        subjectAPI
            .getAllSubject(authToken)
            .then((data) => {
                setSubjects(data);
            })
            .catch((error) => {
                console.error("Error fetching Subjects:", error);
            });
    }, []);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="subject">
                <div className="header d-flex justify-content-between">
                    <h4>Subjects</h4>
                    <Link
                        className="btn btn-primary create-btn"
                        to="/create/subject"
                    >
                        Create Subject
                    </Link>
                </div>
                {/* Boards Header */}
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h5>Subject</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        {subjects.map((subject) => (
                            <div
                                className="card"
                                id="detail-card"
                                key={subject.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6>{subject.name}</h6>
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

export default Subject;
