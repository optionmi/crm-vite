import { Accordion, Button, Card, Form } from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import QuoteInformation from "./components/QuoteInformation";
import AddressInformation from "./components/AddressInformation";
import QuoteItems from "./components/QuoteItems";
import quotesAPI from "../../api/quotesAPI";

export default function CreateQuote() {
    let { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const { quoteID } = useParams();

    const [formData, setFormData] = useState({
        salesperson_id: "",
        subject: "",
        description: "",
        expired_at: "",
        contact_person_id: "",
        lead_id: "",
        billing_address: "",
        billing_country: "",
        billing_state: "",
        billing_city: "",
        billing_postal_code: "",
        shipping_address: "",
        shipping_country: "",
        shipping_state: "",
        shipping_city: "",
        shipping_postal_code: "",
        quote_items: [
            {
                book_id: "",
                quantity: 1,
                price: 0,
                amount: 0,
                discount: 0,
                tax: 0,
                total: 0,
            },
        ],
        sub_total: 0,
        total_discount: 0,
        total_tax: 0,
        adjustment: 0,
        grand_total: 0,
        removed_items: [],
    });

    useEffect(() => {
        if (quoteID) {
            quotesAPI.getQuoteByID(authToken, quoteID).then((data) => {
                setFormData(data);
                // console.log(data);
            });
        }
    }, [quoteID]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (quoteID) {
            // console.log(formData);
            quotesAPI
                .updateQuoteById(authToken, quoteID, formData)
                .then((data) => {
                    if (data.resType === "success") {
                        navigate("/quotes");
                    }
                });
        } else {
            quotesAPI.createQuote(authToken, formData).then((data) => {
                if (data.resType === "success") {
                    navigate("/quotes");
                }
            });
        }
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <div className="d-flex justify-content-between my-2 align-items-center">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/quotes">Quotes</Link>
                            </li>
                            <li
                                aria-current="page"
                                className="breadcrumb-item active"
                            >
                                {quoteID ? "Update" : "Create"} Quote
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex justify-content-center">
                    <Card className="col-lg-8 col-md-10 col-sm-12">
                        <Form onSubmit={handleFormSubmit}>
                            <Card.Header>
                                <Card.Title>
                                    {quoteID ? "Update" : "Create"} Quote
                                </Card.Title>
                                <Button className="my-2" type="submit">
                                    Save Quote
                                </Button>
                            </Card.Header>
                            <Card.Body>
                                <Accordion
                                    defaultActiveKey={["0", "1", "2"]}
                                    flush
                                    alwaysOpen
                                >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            Quote Information
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <QuoteInformation
                                                formData={formData}
                                                setFormData={setFormData}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                            Address Information
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <AddressInformation
                                                formData={formData}
                                                setFormData={setFormData}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>
                                            Quote Items
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <QuoteItems
                                                formData={formData}
                                                setFormData={setFormData}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Body>
                        </Form>
                    </Card>
                </div>
            </main>
        </>
    );
}
