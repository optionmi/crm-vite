import React, { useContext } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button } from "react-bootstrap";
import salespersonAPI from "../../api/salesPersonAPI";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateSalesperson() {
    let { authToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleCreateSalesperson = (e) => {
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;

        if (password === confirm_password) {
            e.preventDefault();
            const salespersonData = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone_number: e.target.phone_number.value,
                team: e.target.team.value,
                password: password,
            };
            salespersonAPI
                .createSalesperson(salespersonData, authToken)
                .then(() => {
                    navigate("/salesperson");
                })
                .catch((error) => {
                    console.error("Error creating salesperson:", error);
                });
        } else {
            console.error("password not matched !");
        }
    };

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="salesperson">
                <h4>Create Salesperson</h4>
                <Card
                    className="create-salesperson-card shadow-sm"
                    style={{ background: "white", height: "fit-content" }}
                >
                    <Card.Body className="create-salesperson-card-body">
                        <Form
                            className="create-salesperson-form"
                            onSubmit={handleCreateSalesperson}
                        >
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="name"
                                        className="create-salesperson-form-group"
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

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="email"
                                        className="create-salesperson-form-group"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="phone-number"
                                        className="create-salesperson-form-group"
                                    >
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="number"
                                            placeholder="Phone Number"
                                            name="phone_number"
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group className="create-salesperson-form-group">
                                        <Form.Label>Team</Form.Label>
                                        <Form.Control as="select" name="team">
                                            <option value="">
                                                Select a Team
                                            </option>
                                            <option value="SalesTeam">
                                                Sales Team
                                            </option>
                                            <option value="SalesCoordinationTeam">
                                                Sales Coordination Team
                                            </option>
                                            <option value="OperationsTeam">
                                                Operations Team
                                            </option>
                                            <option value="ProductandTrainingTeam">
                                                Product and Training Team
                                            </option>
                                            <option value="DispatchandWarehouseTeam">
                                                Dispatch and Warehouse Team
                                            </option>
                                            <option value="FinanceTeam">
                                                Finance Team
                                            </option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="password"
                                        className="create-salesperson-form-group"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-12">
                                    <Form.Group
                                        controlId="confirm-password"
                                        className="create-salesperson-form-group"
                                    >
                                        <Form.Label>
                                            Confirm Password
                                        </Form.Label>
                                        <Form.Control
                                            className="form-contol"
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="confirm_password"
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="create-form-btn">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 create-salesperson-form-group create-salesperson-button"
                                >
                                    Create Salesperson
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CreateSalesperson;
