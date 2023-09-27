import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Card, Form, Button, Tab, Tabs } from "react-bootstrap";
import leadsApi from "../../api/leadsAPI";
import { Country, State, City } from "country-state-city";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import booksAPI from "../../api/booksAPI";
import Tab1 from "./components/Tab1";
import Tab2 from "./components/Tab2";
import Tab3 from "./components/Tab3";
import leadsAPI from "../../api/leadsAPI";
import { Link } from "react-router-dom";

function CreateLead() {
    let { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const stageID = useParams().stageID;
    const LeadStages = [
        "NEW",
        "FOLLOW_UP",
        "VISIT",
        "NEGOTIATION",
        "WON",
        "LOST",
    ];

    const [formData, setFormData] = useState({
        client_name: "",
        requirement: "",
        budget: "",
        source: "",
        type: "",
        expected_close_date: "",
        stage: LeadStages[stageID - 1],
        salesperson_id: "",
        lead_contact_person_id: parseInt(""),
        organization_id: "",
        // book_id: "",
        // price: "",
        // quantity: "",
        total_amount: "",
        lead_products: [],
    });

    const handleCreateLead = async (e) => {
        e.preventDefault();
        // console.log(formData);
        const response = await leadsAPI.createLead(authToken, formData);
        if (response) {
            navigate("/leads");
        }
    };

    return (
        <div>
            <Header />
            <Sidebar />

            <div className="d-flex justify-content-center publisher">
                <div className="col-md-6">
                    {/* <div className="page-header"> */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/leads">Leads</Link>
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                Create Lead
                            </li>
                        </ol>
                    </nav>
                    <div className="page-title my-2">
                        <h2>Create Lead</h2>
                    </div>
                    <Form
                        className="create-lead-form"
                        onSubmit={handleCreateLead}
                    >
                        <div className="panel-header my-4 d-flex align-items-center gap-4">
                            <Button type="submit">Save as Lead</Button>
                            {/* <a href="#">Back</a> */}
                        </div>
                        {/* </div> */}
                        <Tabs defaultActiveKey="details" id="my-tabs">
                            <Tab eventKey="details" title="Details">
                                <Tab1
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            </Tab>
                            <Tab
                                eventKey="contact-person"
                                title="Contact Person"
                            >
                                <Tab2
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            </Tab>
                            <Tab eventKey="products" title="Products">
                                <Tab3
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            </Tab>
                        </Tabs>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default CreateLead;
