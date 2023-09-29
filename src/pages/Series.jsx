import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import seriesAPI from "../api/seriesAPI";
import { Card, Table } from "react-bootstrap";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

function Series() {
    const { authToken } = useContext(AuthContext);
    const [series, setSeries] = useState([]);

    const [notification, setNotification] = useState({
        type: "",
        message: "",
        show: false,
    });

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const data = await seriesAPI.getAllSeries(authToken);
                setSeries(data);
            } catch (error) {
                console.error("Error fetching series:", error);
            }
        };

        fetchSeries();
    }, []);

    const handleDelete = async (seriesID) => {
        try {
            const data = await seriesAPI.deleteSeriesByID(seriesID, authToken);
            setNotification({
                type: data.resType,
                message: data.message,
                show: true,
            });
            if (data.resType === "success") {
                setSeries((prevSeries) =>
                    prevSeries.filter((series) => series.id !== seriesID)
                );
            }
        } catch (error) {
            console.error("Error deleting Subject:", error);
        }
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="series">
                <div className="header d-flex justify-content-between">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                Series
                            </li>
                        </ol>
                    </nav>
                    <Link
                        className="btn btn-primary create-btn"
                        to="/create/series"
                    >
                        Create Series
                    </Link>
                </div>
                <Card>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>#</th>
                                    <th style={{ width: "30%" }}>Subject</th>
                                    <th style={{ width: "40%" }}>Series</th>
                                    <th style={{ width: "20%" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {series.map((series, index) => (
                                    <tr key={series.id}>
                                        <td>{index + 1}</td>
                                        <td>{series.subject.name}</td>
                                        <td>{series.name}</td>
                                        <td className="d-flex gap-3">
                                            <Link
                                                className="btn btn-sm btn-success"
                                                to={`/update-series/${series.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <DeleteConfirmationModal
                                                handleDelete={() =>
                                                    handleDelete(series.id)
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
        </div>
    );
}

export default Series;
