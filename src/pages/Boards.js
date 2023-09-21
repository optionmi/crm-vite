import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AuthContext from "../context/AuthContext";
import boardAPI from "../api/boardAPI";
import { Link } from "react-router-dom";

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
                    <h4>Boards</h4>
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
                                <h5>Board</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scroll-cards">
                        {boards.map((board) => (
                            <div
                                className="card"
                                id="detail-card"
                                key={board.id}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6>{board.name}</h6>
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

export default Boards;
