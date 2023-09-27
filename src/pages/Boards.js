import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import boardAPI from "../api/boardAPI";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

function Boards() {
    let { authToken } = useContext(AuthContext);
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        boardAPI
            .getAllBoard(authToken)
            .then((data) => {
                setBoards(data);
            })
            .catch((error) => {
                console.error("Error fetching boards:", error);
            });
    }, []);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="boards">
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
                                Boards
                            </li>
                        </ol>
                    </nav>
                    <Link
                        className="btn btn-primary create-btn"
                        to="/create/board"
                    >
                        Create Board
                    </Link>
                </div>
                {/* Boards Header */}
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h5>Boards</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>#</th>
                                    <th style={{ width: "60%" }}>Board</th>
                                    <th style={{ width: "30%" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boards.map((board, index) => (
                                    <tr key={board.id}>
                                        <td>{index + 1}</td>
                                        <td>{board.name}</td>
                                        <td className="d-flex gap-3">
                                            <Button size="sm" variant="success">
                                                Edit
                                            </Button>
                                            <Button size="sm" variant="danger">
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Boards;
