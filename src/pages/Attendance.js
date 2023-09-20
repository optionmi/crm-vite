import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import attendanceAPI from "../api/attendanceAPI";
import AuthContext from "../context/AuthContext";

function Attendance() {
    let { authToken, ID } = useContext(AuthContext);
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        attendanceAPI
            .getAttendance(authToken, ID)
            .then((data) => {
                console.log(String(data.is_present));
                setAttendance(data);
            })
            .catch((error) => {
                console.error("Error fetching attendance:", error);
            });
    }, []);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="publisher">
                <div className="header d-flex justify-content-between">
                    <h4>Attendance</h4>
                    <a
                        className="btn btn-primary create-btn"
                        href="/create/attendance"
                    >
                        Mark Attendance
                    </a>
                </div>
                {/* Publisher Header */}
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h5>Date</h5>
                            </div>
                            <div className="col-6">
                                <h5>Is Present</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        {attendance.map((attendance) => (
                            <div
                                className="card"
                                id="detail-card"
                                key={attendance.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6>
                                                {attendance.date.split("T")[0]}
                                            </h6>
                                        </div>
                                        <div className="col-6">
                                            <h6>{attendance.ispresent}</h6>
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

export default Attendance;
