import React, { useContext } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button } from "react-bootstrap";
import boardAPI from "../../api/boardAPI";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateBoards() {
    let { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleCreateBoards = (e) => {
        e.preventDefault();
        const boardData = {
            name: e.target.name.value,
        };

        boardAPI
            .createBoard(boardData, authToken)
            .then(() => {
                console.log("Marked !!!");
                // navigate('/attendance')
            })
            .catch((error) => {
                console.error("Error creating Board:", error);
            });
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="boards">
                <h4>Create Board</h4>
                <Card
                    className="create-boards-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-boards-card-body">
                        <Form
                            className="create-boards-form"
                            onSubmit={handleCreateBoards}
                        >
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="name"
                                        className="create-boards-form-group"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            required
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
                                    Create Board
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
