import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button } from "react-bootstrap";
import boardAPI from "../../api/boardAPI";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function CreateBoards() {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const { boardID } = useParams();
    const [boardData, setBoardData] = useState({ name: "" });

    useEffect(() => {
        if (boardID) {
            boardAPI
                .getBoardByID(boardID, authToken)
                .then((data) => {
                    setBoardData({ name: data.name });
                })
                .catch((error) => {
                    console.error("Error fetching Board:", error);
                });
        }
    }, []);

    const handleCreateBoards = (e) => {
        e.preventDefault();
        // setBoardData({ name: e.target.value });

        boardAPI
            .createBoard(boardData, authToken)
            .then(() => {
                navigate("/boards");
            })
            .catch((error) => {
                console.error("Error creating Board:", error);
            });
    };

    const handleUpdateBoardSubmit = (e) => {
        e.preventDefault();
        boardAPI.updateBoardByID(boardID, boardData, authToken).then(() => {
            navigate("/boards");
        });
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="boards">
                <h4>{boardID ? "Update" : "Create"} Board</h4>
                <Card
                    className="create-boards-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-boards-card-body">
                        <Form
                            className="create-boards-form"
                            onSubmit={
                                boardID
                                    ? handleUpdateBoardSubmit
                                    : handleCreateBoards
                            }
                        >
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="name"
                                        className="create-boards-form-group"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            required
                                            value={boardData.name}
                                            onChange={(e) =>
                                                setBoardData({
                                                    ...boardData,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="create-form-btn">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 create-boards-form-group create-boards-button"
                                >
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CreateBoards;
