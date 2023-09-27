import React, { useContext } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button } from "react-bootstrap";
import claimAPI from "../../api/claimAPI";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateClaim() {
    let { authToken, ID } = useContext(AuthContext);

    const navigate = useNavigate();

    const date = new Date().toISOString().split("T")[0];

    const handleCreateClaim = (e) => {
        e.preventDefault();
        const claimData = {
            claim_description: e.target.claim_description.value,
            amount: e.target.amount.value,
            id: ID,
        };

        claimAPI
            .createClaim(claimData, authToken)
            .then(() => {
                navigate("/travelling-claim");
            })
            .catch((error) => {
                console.error("Error creating Claim:", error);
            });
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="claim">
                <h4>Create Claim</h4>
                <Card
                    className="create-claim-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-claim-card-body">
                        <Form
                            className="create-claim-form"
                            onSubmit={handleCreateClaim}
                        >
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="date"
                                        className="create-claim-form-group"
                                    >
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="text"
                                            value={date}
                                            name="date"
                                            disabled
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="claim-description"
                                        className="create-claim-form-group"
                                    >
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="text"
                                            placeholder="Description"
                                            name="claim_description"
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="amount"
                                        className="create-claim-form-group"
                                    >
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="number"
                                            placeholder="Amount"
                                            name="amount"
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="create-form-btn">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 create-claim-form-group create-claim-button"
                                >
                                    Create Claim
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CreateClaim;
