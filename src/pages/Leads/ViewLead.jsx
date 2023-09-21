import {
    Breadcrumb,
    Button,
    Card,
    Dropdown,
    Form,
    FormGroup,
    ListGroup,
    ListGroupItem,
    Modal,
    Tab,
    Tabs,
} from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import leadsAPI from "../../api/leadsAPI";
import AuthContext from "../../context/AuthContext";
import Tab1 from "./components/Tab1";
import Tab2 from "./components/Tab2";
import Tab3 from "./components/Tab3";

export default function ViewLead() {
    const { leadID } = useParams();
    const { authToken } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // console.log(leadID);

    const [lead, setLead] = useState("");
    useEffect(() => {
        leadsAPI.getLeadById(authToken, leadID).then((data) => {
            const Dt = new Date(data?.expected_close_date);
            const date = Dt.getDate();
            const month = Dt.getMonth();
            const year = Dt.getFullYear();
            data.expected_close_date = `${year}-${month}-${date}`;
            setLead(data);
            console.log(data);
        });
    }, []);

    const leadDetails = [
        { label: "Client Name", value: lead?.client_name },
        { label: "Requirements", value: lead?.requirement },
        { label: "Lead Budget", value: lead?.budget },
        { label: "Source", value: lead?.source },
        { label: "Type", value: lead?.type },
        // { label: "Sales Owner", value: lead?.salesperson.name },
        {
            label: "Expected Close Date",
            value: lead?.expected_close_date,
        },
    ];

    const leadContactPerson = [
        { label: "Name", value: lead?.salesperson?.name },
        {
            label: "Email",
            value: lead?.leads_contact_person?.contact.emails
                .map((it) => it.email)
                .join(","),
        },
        {
            label: "Contact Number",
            value: lead?.leads_contact_person?.contact.contact_numbers
                .map((it) => it.number)
                .join(","),
        },
        {
            label: "Organization",
            value: lead?.leads_contact_person?.contact.organization.name,
        },
    ];

    const leadProducts = lead.leads_products?.map((product) => [
        {
            label: "Name",
            value: product.book?.title,
        },
        {
            label: "Price",
            value: `₹ ${product.price}`,
        },
        {
            label: "Quantity",
            value: product.quantity,
        },
        {
            label: "Total Amount",
            value: `₹ ${(product.price * product.quantity).toFixed(2)}`,
        },
    ]);
    console.log(leadProducts);

    const LeadDetailsCard = ({ data }) => (
        <Card className="mb-4">
            <Card.Body>
                <table className="table">
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index}>
                                <td className="label">{item.label}</td>
                                <td> {item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );

    const ProductDetailsCard = ({ data }) => (
        <Card className="mb-4">
            <Card.Body>
                <ListGroup variant="flush">
                    {data?.map((item, index) => (
                        <ListGroupItem key={index}>
                            <table className="table">
                                <tbody>
                                    {item.map((row, index) => (
                                        <tr key={index}>
                                            <td className="label">
                                                {row.label}
                                            </td>
                                            <td> {row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );

    // Notes
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState("");
    const handleNoteInput = (e) => {
        setNote(e.target.value);
    };
    const handleNoteSubmit = (e) => {
        e.preventDefault();
        const noteArr = [...notes, note];
        setNotes(noteArr);
        setNote("");
    };
    // End Notes

    return (
        <>
            <Header />
            <Sidebar />
            <main>
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
                            View Lead
                        </li>
                    </ol>
                </nav>
                <div className="d-flex">
                    <div className="col-md-4 col-sm-8 p-2">
                        <h5 className="fw-bold">Details</h5>
                        <LeadDetailsCard data={leadDetails} />

                        <h5 className="fw-bold">Contact Person</h5>
                        <LeadDetailsCard data={leadContactPerson} />

                        <h5 className="fw-bold">Products</h5>
                        {lead.leads_products?.length > 0 ? (
                            <ProductDetailsCard data={leadProducts} />
                        ) : (
                            <Card className="mb-4">
                                <Card.Body>
                                    <h6 className="text-center">
                                        No Records Found
                                    </h6>
                                </Card.Body>
                            </Card>
                        )}
                    </div>

                    <div className="col-sm-8 p-2">
                        <div className="col-12 d-flex justify-content-end pb-5">
                            <Button onClick={handleShowModal}>Edit</Button>
                        </div>
                        <div className="col-12 custom-breadcrumb">
                            <ul className="breadcrumb">
                                <li>
                                    <a className="custom-btn active">New</a>
                                </li>
                                <li>
                                    <a className="custom-btn">Follow Up</a>
                                </li>
                                <li>
                                    <a className="custom-btn">Visit</a>
                                </li>
                                <li>
                                    <a className="custom-btn">Negotiation</a>
                                </li>
                                <li>
                                    <a
                                        className="custom-btn dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        role="button"
                                    >
                                        Won/Lost
                                    </a>

                                    <ul className="dropdown-menu">
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Won
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Lost
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        {/* Note */}
                        <div className="d-flex flex-column gap-3">
                            <Card>
                                <Card.Body>
                                    <Tabs
                                        defaultActiveKey="note"
                                        className="mb-3"
                                    >
                                        <Tab eventKey="note" title="Note">
                                            <Form onSubmit={handleNoteSubmit}>
                                                <FormGroup>
                                                    <Form.Label>
                                                        Note
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        value={note}
                                                        onChange={
                                                            handleNoteInput
                                                        }
                                                        required
                                                    />
                                                </FormGroup>

                                                <Button
                                                    type="submit"
                                                    className="my-4"
                                                >
                                                    Save
                                                </Button>
                                            </Form>
                                        </Tab>
                                        <Tab
                                            eventKey="activity"
                                            title="Activity"
                                        >
                                            Tab content for Activity
                                        </Tab>
                                        <Tab eventKey="email" title="Email">
                                            Tab content for Email
                                        </Tab>
                                        <Tab eventKey="file" title="File">
                                            Tab content for File
                                        </Tab>
                                        <Tab eventKey="quote" title="Quote">
                                            Tab content for Quote
                                        </Tab>
                                    </Tabs>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Header>Notes</Card.Header>
                                <Card.Body>
                                    {notes.length ? (
                                        notes.map((note) => <p>{note}</p>)
                                    ) : (
                                        <h6 className="text-center">
                                            No Notes Yet
                                        </h6>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Modal size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Lead</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="details">
                        <Tab eventKey="details" title="Details">
                            <Tab1 formData={lead} setFormData={setLead} />
                        </Tab>
                        <Tab eventKey="contact-person" title="Contact Person">
                            <Tab2 formData={lead} setFormData={setLead} />
                        </Tab>
                        <Tab eventKey="products" title="Products">
                            <Tab3 formData={lead} setFormData={setLead} />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
