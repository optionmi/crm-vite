import React, { useContext } from "react";
import {
    Card,
    Form,
    Button,
    Container,
    Row,
    Col,
    Alert,
} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

const Login = () => {
    let { loginUser, Message, Loading } = useContext(AuthContext);
    return (
        <div className="login">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col xs={12} md={6} lg={10} className="mx-auto">
                        <Card
                            className="login-card shadow-sm"
                            style={{ background: "white" }}
                        >
                            <Card.Body>
                                <h3 className="text-muted text-center login-title">
                                    Welcome Back
                                </h3>
                                {Message && (
                                    <Alert variant="danger" className="mb-3">
                                        {Message}
                                    </Alert>
                                )}
                                <Form
                                    onSubmit={loginUser}
                                    className="login-form"
                                >
                                    <Form.Group
                                        controlId="email"
                                        className="login-form-group"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className="form-contol shadow-none"
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        controlId="password"
                                        className="login-form-group"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            className="form-contol shadow-none"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            required
                                        />
                                    </Form.Group>

                                    <Button
                                        disabled={Loading}
                                        variant="primary"
                                        type="submit"
                                        className="w-100 login-form-group login-button"
                                    >
                                        Login
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
