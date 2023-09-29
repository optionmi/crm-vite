import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import boardAPI from "../api/boardAPI";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

function Boards() {
    const { authToken } = useContext(AuthContext);
    const [boards, setBoards] = useState([]);
    const [notification, setNotification] = useState({
        type: "",
        message: "",
        show: false,
    });

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const data = await boardAPI.getAllBoard(authToken);
                setBoards(data);
            } catch (error) {
                console.error("Error fetching boards:", error);
            }
        };

        fetchBoards();
    }, []);

    const handleDelete = async (boardID) => {
        try {
            const data = await boardAPI.deleteBoardByID(boardID, authToken);

            if (data.resType === "success") {
                setBoards((prevBoards) =>
                    prevBoards.filter((board) => board.id !== boardID)
                );
            }

            setNotification({
                type: data.resType,
                message: data.message,
                show: true,
            });
        } catch (error) {
            console.error("Error deleting board:", error);
        }
    };

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
                <Card>
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
                                            <Link
                                                className="btn btn-sm btn-success"
                                                to={`/update-board/${board.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <DeleteConfirmationModal
                                                handleDelete={() =>
                                                    handleDelete(board.id)
                                                }
                                                notification={notification}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Boards;
