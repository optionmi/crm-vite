import {
    Breadcrumb,
    Button,
    Card,
    Dropdown,
    Form,
    FormCheck,
    FormControl,
    FormGroup,
    FormLabel,
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
import ToastNotification from "../../components/ToastNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import SearchSelect from "../../components/SearchSelect";
import TimeAgo from "react-timeago";
import Participants from "./components/Participants";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ViewLead() {
    const { leadID } = useParams();
    const { authToken } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({ type: "", message: "" });

    const [showModal, setShowModal] = useState({
        edit: false,
        won_lost: false,
    });

    const [emailBody, setEmailBody] = useState("");

    const handleShowModal = (modal) => {
        const modalStatus = { ...showModal, [modal]: true };
        setShowModal(modalStatus);
    };
    const handleCloseModal = (modal) => {
        const modalStatus = { ...showModal, [modal]: false };
        setShowModal(modalStatus);
    };

    const [lead, setLead] = useState("");
    useEffect(() => {
        leadsAPI.getLeadById(authToken, leadID).then((data) => {
            const Dt = new Date(data?.expected_close_date);
            const date = ("0" + (Dt.getDate() + 1)).slice(-2);
            const month = ("0" + (Dt.getMonth() + 1)).slice(-2);
            const year = Dt.getFullYear();
            data.expected_close_date = `${year}-${month}-${date}`;

            setLead(data);
            setCurrentStage(data.stage);
            console.log(data);
        });
    }, []);

    const [combinedRecords, setCombinedRecords] = useState([]);
    useEffect(() => {
        if (lead.lead_notes && lead.lead_activities && lead.lead_files) {
            lead.lead_notes.map((note) => (note.recordType = "note"));
            lead.lead_activities.map(
                (activity) => (activity.recordType = "activity")
            );
            lead.lead_files.map((file) => (file.recordType = "file"));

            const combinedRecordsArr = [
                ...lead.lead_notes,
                ...lead.lead_activities,
                ...lead.lead_files,
            ];

            combinedRecordsArr.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setCombinedRecords(combinedRecordsArr);
        }
    }, [lead]);

    const leadDetails = [
        { label: "Client Name", value: lead?.client_name },
        { label: "Requirements", value: lead?.requirement },
        { label: "Lead Budget", value: `₹ ${lead?.budget}` },
        { label: "Source", value: lead?.source },
        { label: "Type", value: lead?.type },
        {
            label: "Expected Close Date",
            value: lead?.expected_close_date?.toLocaleString(),
        },
    ];

    const leadContactPerson = [
        { label: "Name", value: lead?.salesperson?.name },
        {
            label: "Email",
            value: lead?.lead_contact_person?.contact.emails
                .map((it) => it.email)
                .join(","),
        },
        {
            label: "Contact Number",
            value: lead?.lead_contact_person?.contact.contact_numbers
                .map((it) => it.number)
                .join(","),
        },
        {
            label: "Organization",
            value: lead?.lead_contact_person?.contact.organization.name,
        },
    ];

    const leadProducts = lead.lead_products?.map((product) => [
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

    // Stages
    const stages = ["NEW", "FOLLOW_UP", "VISIT", "NEGOTIATION", "WON/LOST"];
    const [currentStage, setCurrentStage] = useState("NEW");

    const handleSetCurrentStage = (stage) => {
        if (stage === currentStage) return;
        setCurrentStage(stage);
        leadsAPI.updateStage(authToken, leadID, { stage }).then((data) => {
            // console.log(data);
            const Dt = new Date(data?.expected_close_date);
            const date = ("0" + (Dt.getDate() + 1)).slice(-2);
            const month = ("0" + (Dt.getMonth() + 1)).slice(-2);
            const year = Dt.getFullYear();
            data.expected_close_date = `${year}-${month}-${date}`;
            setLead(data);
            setMessage({ message: data.message, type: data.resType });
            setShow(true);
        });
    };

    function convertString(str) {
        // Replace underscores with spaces and convert to lowercase
        str = str.replace(/_/g, " ").toLowerCase();

        // Capitalize the first letter of each word
        str = str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        return str;
    }
    // End Stages

    // Notes
    const [note, setNote] = useState("");
    const handleNoteInput = (e) => {
        setNote(e.target.value);
    };

    const handleNoteSubmit = (e, lead) => {
        e.preventDefault();
        leadsAPI.addNote(authToken, leadID, note).then((data) => {
            // console.log(data);
            const notesArr = [...lead.lead_notes, data];
            const newLeadData = { ...lead, lead_notes: notesArr };
            setLead(newLeadData);

            setMessage({ message: data.message, type: data.resType });
            setShow(true);
            // console.log(newLeadData);
        });
        setNote("");
    };
    // End Notes

    // Activity
    const [activity, setActivity] = useState({
        title: "",
        type: "",
        location: "",
        description: "",
        dt_from: "",
        dt_to: "",
        user_ids: [],
        contact_ids: [],
    });
    const handleActivitySubmit = (e, lead) => {
        e.preventDefault();
        leadsAPI.addActivity(authToken, leadID, activity).then((data) => {
            // console.log(data);
            const activitiesArr = [...lead.lead_activities, data];
            const newLeadData = { ...lead, lead_activities: activitiesArr };
            setLead(newLeadData);

            setMessage({ message: data.message, type: data.resType });
            setShow(true);
            // console.log(newLeadData);
        });
        setActivity({
            title: "",
            type: "",
            location: "",
            description: "",
            dt_from: "",
            dt_to: "",
            user_ids: [],
            contact_ids: [],
        });
    };

    const handleActivityInput = (e) => {
        setActivity({ ...activity, [e.target.name]: e.target.value });
        console.log(activity);
    };

    // End Activity

    // File
    const [fileData, setFileData] = useState({
        name: "",
        description: "",
        file: "",
    });
    const handleFileNameInput = (e) => {
        setFileData({ ...fileData, name: e.target.value });
    };
    const handleFileDescriptionInput = (e) => {
        setFileData({ ...fileData, description: e.target.value });
    };

    const handleFileInput = (e) => {
        setFileData({ ...fileData, file: e.target.files[0] });
    };

    const handleFileSubmit = (e, lead) => {
        e.preventDefault();
        leadsAPI.addFile(authToken, leadID, fileData).then((data) => {
            console.log(data);
            setMessage({ message: data.message, type: data.resType });
            setShow(true);
        });
    };

    // End File

    // WON/LOST
    const [selection, setSelection] = useState("");
    const [wonValue, setWonValue] = useState("");
    const [lostReason, setLostReason] = useState("");
    const [closedDate, setClosedDate] = useState("");

    const handleWonLostSubmit = (e) => {
        e.preventDefault();
        const updateData = {
            stage: selection,
            won_value: parseFloat(wonValue),
            lost_reason: lostReason,
            closed_date: new Date(closedDate).toISOString(),
        };
        handleCloseModal("won_lost");
        leadsAPI.updateStage(authToken, leadID, updateData).then((data) => {
            // console.log(data);
            setLead(data);
            setMessage({ message: data.message, type: data.resType });
            setShow(true);
        });
    };
    // End Won/Lost

    // Edit Lead
    const handleEditLeadSubmit = (e) => {
        e.preventDefault();
        console.log("data sent:", lead);
        leadsAPI.updateLead(authToken, leadID, lead).then((data) => {
            // console.log(data);
            setMessage({ message: data.message, type: data.resType });
            setShow(true);
        });
    };
    // End Edit Lead

    return (
        <>
            <Header />
            <Sidebar />
            <ToastNotification
                type={message.type}
                message={message.message}
                showToast={show}
                closeToast={() => setShow(false)}
            />
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

                <div className="d-flex border-top">
                    <div className="col-md-4 col-sm-8 p-2">
                        <div className="d-flex justify-content-between mb-2">
                            <h5 className="fw-bold">Details</h5>
                            <Button
                                size="sm"
                                onClick={() => handleShowModal("edit")}
                            >
                                Edit
                            </Button>
                        </div>
                        <LeadDetailsCard data={leadDetails} />

                        <h5 className="fw-bold">Contact Person</h5>
                        <LeadDetailsCard data={leadContactPerson} />

                        <h5 className="fw-bold">Products</h5>
                        {lead.lead_products?.length > 0 ? (
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
                        <div className="col-12 custom-breadcrumb">
                            <ul className="breadcrumb">
                                {stages.map((stage, index) => (
                                    <li key={index}>
                                        <a
                                            className={`${
                                                stages.indexOf(currentStage) >=
                                                    index &&
                                                lead.stage !== "WON" &&
                                                lead.stage !== "LOST"
                                                    ? "active"
                                                    : lead.stage === "WON"
                                                    ? "bg-success"
                                                    : lead.stage === "LOST"
                                                    ? "bg-danger"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                if (stage === "WON/LOST") {
                                                    handleShowModal("won_lost");
                                                    return;
                                                }
                                                handleSetCurrentStage(stage);
                                            }}
                                        >
                                            {convertString(stage)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="d-flex justify-content-between">
                                <small className="fw-bold mb-2">
                                    <span className="label">Created:</span>
                                    <TimeAgo date={lead.createdAt} />
                                </small>
                                <small className="fw-bold mb-2">
                                    <span className="label">
                                        Expected Close Date:
                                    </span>
                                    <TimeAgo date={lead.expected_close_date} />
                                </small>
                            </div>
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
                                            <Form
                                                onSubmit={(e) =>
                                                    handleNoteSubmit(e, lead)
                                                }
                                                className="d-flex flex-column gap-3"
                                            >
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
                                                    variant="success"
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
                                            <Form
                                                className="d-flex flex-column gap-3"
                                                onSubmit={(e) =>
                                                    handleActivitySubmit(
                                                        e,
                                                        lead
                                                    )
                                                }
                                            >
                                                <FormGroup>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl
                                                        onChange={
                                                            handleActivityInput
                                                        }
                                                        value={activity.title}
                                                        name="title"
                                                    ></FormControl>
                                                </FormGroup>

                                                <FormGroup>
                                                    <FormLabel>
                                                        Activity Type
                                                    </FormLabel>
                                                    <FormControl
                                                        as="select"
                                                        onChange={
                                                            handleActivityInput
                                                        }
                                                        value={activity.type}
                                                        name="type"
                                                    >
                                                        <option value="CALL">
                                                            Call
                                                        </option>
                                                        <option value="MEETING">
                                                            Meeting
                                                        </option>
                                                        <option value="LUNCH">
                                                            Lunch
                                                        </option>
                                                    </FormControl>
                                                </FormGroup>

                                                <FormGroup>
                                                    <FormLabel>
                                                        Schedule
                                                    </FormLabel>
                                                    <div className="d-flex gap-2">
                                                        <FormControl
                                                            type="datetime-local"
                                                            placeholder="From"
                                                            onChange={
                                                                handleActivityInput
                                                            }
                                                            value={
                                                                activity.dt_from
                                                            }
                                                            name="dt_from"
                                                        ></FormControl>
                                                        <FormControl
                                                            type="datetime-local"
                                                            placeholder="To"
                                                            onChange={
                                                                handleActivityInput
                                                            }
                                                            value={
                                                                activity.dt_to
                                                            }
                                                            name="dt_to"
                                                        ></FormControl>
                                                    </div>
                                                </FormGroup>

                                                <FormGroup>
                                                    <FormLabel>
                                                        Location
                                                    </FormLabel>
                                                    <FormControl
                                                        onChange={
                                                            handleActivityInput
                                                        }
                                                        value={
                                                            activity.location
                                                        }
                                                        name="location"
                                                    ></FormControl>
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormLabel>
                                                        Description
                                                    </FormLabel>
                                                    <FormControl
                                                        as="textarea"
                                                        rows="3"
                                                        onChange={
                                                            handleActivityInput
                                                        }
                                                        value={
                                                            activity.description
                                                        }
                                                        name="description"
                                                    ></FormControl>
                                                </FormGroup>

                                                {/* <FormGroup>
                                                    <FormLabel>
                                                        Participants
                                                    </FormLabel>
                                                    <Participants />
                                                </FormGroup> */}
                                                <Button
                                                    variant="success"
                                                    className="my-4"
                                                    type="submit"
                                                >
                                                    Save
                                                </Button>
                                            </Form>
                                        </Tab>
                                        <Tab eventKey="email" title="Email">
                                            <Form className="d-flex flex-column gap-3">
                                                <FormGroup>
                                                    <FormLabel>To</FormLabel>
                                                    <FormControl
                                                        type="email"
                                                        placeholder="Enter Email Address"
                                                    ></FormControl>
                                                </FormGroup>

                                                <FormGroup>
                                                    <FormLabel>
                                                        Subject
                                                    </FormLabel>
                                                    <FormControl></FormControl>
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormLabel>
                                                        Message
                                                    </FormLabel>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={emailBody}
                                                        onChange={setEmailBody}
                                                    />
                                                </FormGroup>
                                                <Button variant="success">
                                                    Send
                                                </Button>
                                            </Form>
                                        </Tab>
                                        <Tab eventKey="file" title="File">
                                            <Form
                                                className="d-flex flex-column gap-3"
                                                onSubmit={(e) =>
                                                    handleFileSubmit(e, lead)
                                                }
                                                encType="multipart/form-data"
                                            >
                                                <FormGroup>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl
                                                        placeholder="File Name"
                                                        onChange={
                                                            handleFileNameInput
                                                        }
                                                    ></FormControl>
                                                </FormGroup>

                                                <FormGroup>
                                                    <FormLabel>
                                                        Description
                                                    </FormLabel>
                                                    <FormControl
                                                        placeholder="File Description"
                                                        as="textarea"
                                                        rows={"3"}
                                                        onChange={
                                                            handleFileDescriptionInput
                                                        }
                                                    ></FormControl>
                                                </FormGroup>

                                                <FormGroup>
                                                    <FormLabel>File</FormLabel>
                                                    <FormControl
                                                        placeholder="File"
                                                        type="file"
                                                        onChange={
                                                            handleFileInput
                                                        }
                                                    ></FormControl>
                                                </FormGroup>

                                                <Button
                                                    variant="success"
                                                    type="submit"
                                                    className="my-4"
                                                >
                                                    Save
                                                </Button>
                                            </Form>
                                        </Tab>
                                        <Tab eventKey="quote" title="Quote">
                                            Tab content for Quote
                                        </Tab>
                                    </Tabs>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Header>All</Card.Header>
                                <Card.Body>
                                    {/* {lead.lead_notes?.length ? ( */}
                                    <ListGroup variant="flush">
                                        {combinedRecords?.map(
                                            (record, index) => (
                                                <ListGroupItem
                                                    key={index}
                                                    variant={
                                                        new Date() <
                                                        new Date(record.dt_to)
                                                            ? "info"
                                                            : "light"
                                                    }
                                                    // active={
                                                    //     new Date() <
                                                    //     new Date(record.dt_to)
                                                    // }
                                                >
                                                    <div className="d-flex justify-content-between  my-2">
                                                        <small>
                                                            {convertString(
                                                                record.recordType
                                                            )}{" "}
                                                            Added
                                                        </small>
                                                        <small>
                                                            <TimeAgo
                                                                date={
                                                                    record.createdAt
                                                                }
                                                            />
                                                        </small>
                                                    </div>

                                                    {record.recordType ===
                                                        "note" && (
                                                        <p className="bg-warning p-2 rounded">
                                                            {record.note}
                                                        </p>
                                                    )}

                                                    {record.recordType ===
                                                        "activity" && (
                                                        <>
                                                            <p>
                                                                {convertString(
                                                                    record.type
                                                                )}{" "}
                                                                Scheduled at{" "}
                                                                {new Date(
                                                                    record.dt_from
                                                                ).toLocaleString()}{" "}
                                                                -{" "}
                                                                {new Date(
                                                                    record.dt_to
                                                                ).toLocaleString()}
                                                            </p>
                                                            <p className="bg-warning p-2 rounded">
                                                                {
                                                                    record.description
                                                                }
                                                            </p>
                                                        </>
                                                    )}

                                                    {record.recordType ===
                                                        "file" && (
                                                        <>
                                                            <p>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faLink
                                                                    }
                                                                />{" "}
                                                                <a
                                                                    href={`http://localhost:8000/files/lead/${record.file_name}`}
                                                                >
                                                                    {
                                                                        record.name
                                                                    }
                                                                </a>
                                                            </p>
                                                            <p className="bg-warning p-2 rounded">
                                                                {
                                                                    record.description
                                                                }
                                                            </p>
                                                        </>
                                                    )}

                                                    <small>
                                                        {new Date(
                                                            record.createdAt
                                                        ).toLocaleString()}{" "}
                                                        · {record.user.name} (
                                                        {record.user.email})
                                                    </small>
                                                </ListGroupItem>
                                            )
                                        )}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Modal
                size="lg"
                show={showModal.edit}
                onHide={() => handleCloseModal("edit")}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Lead</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditLeadSubmit}>
                        <Button
                            variant="primary"
                            onClick={() => handleCloseModal("edit")}
                            className="btn-sm mb-2"
                            type="submit"
                        >
                            Save Changes
                        </Button>

                        <Tabs defaultActiveKey="details">
                            <Tab eventKey="details" title="Details">
                                <Tab1 formData={lead} setFormData={setLead} />
                            </Tab>
                            <Tab
                                eventKey="contact-person"
                                title="Contact Person"
                            >
                                <Tab2 formData={lead} setFormData={setLead} />
                            </Tab>
                            <Tab eventKey="products" title="Products">
                                <Tab3 formData={lead} setFormData={setLead} />
                            </Tab>
                        </Tabs>
                    </Form>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => handleCloseModal("edit")}
                    >
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>

            {/* won/lost */}

            <Modal
                show={showModal.won_lost}
                onHide={() => handleCloseModal("won_lost")}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Won/Lost</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleWonLostSubmit}>
                    <Modal.Body>
                        <FormGroup className="d-flex justify-content-around">
                            <FormCheck
                                type="radio"
                                label="Won"
                                name="won-lost"
                                checked={selection === "WON"}
                                onChange={() => setSelection("WON")}
                            />
                            <FormCheck
                                type="radio"
                                label="Lost"
                                name="won-lost"
                                checked={selection === "LOST"}
                                onChange={() => setSelection("LOST")}
                            />
                        </FormGroup>

                        {selection === "WON" && (
                            <FormGroup>
                                <FormLabel>Won Value</FormLabel>
                                <Form.Control
                                    type="number"
                                    value={wonValue}
                                    onChange={(e) =>
                                        setWonValue(e.target.value)
                                    }
                                    required
                                />
                            </FormGroup>
                        )}

                        {selection === "LOST" && (
                            <FormGroup>
                                <FormLabel>Lost Reason</FormLabel>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={lostReason}
                                    onChange={(e) =>
                                        setLostReason(e.target.value)
                                    }
                                    required
                                />
                            </FormGroup>
                        )}

                        <FormGroup>
                            <FormLabel>Closed Date</FormLabel>
                            <Form.Control
                                type="date"
                                value={closedDate}
                                onChange={(e) => setClosedDate(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => handleCloseModal("won_lost")}
                        >
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
