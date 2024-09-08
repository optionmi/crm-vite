import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import emailAPI from "../../api/emailAPI";
import AuthContext from "../../context/AuthContext";
import { Card } from "react-bootstrap";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function ViewEmail() {
    const { authToken } = useContext(AuthContext);
    const { emailID } = useParams();
    const [emailData, setEmailData] = useState({});

    useEffect(() => {
        emailAPI.getEmailByID(authToken, emailID).then((data) => {
            // console.log(data);
            setEmailData(data.email);
        });
    }, [emailID]);

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
                                <Link to="/emails/inbox">Emails</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                {emailData.subject}
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="d-flex justify-content-center">
                    <Card className="col-lg-8 col-md-10 col-sm-12">
                        <Card.Header>
                            <Card.Title className="fw-bold">
                                {emailData.subject}
                            </Card.Title>
                            <p>
                                <FontAwesomeIcon icon={faCircleUser} />
                                <span className="fw-bold text-capitalize mx-2">
                                    {emailData.user?.name}
                                </span>{" "}
                                ({emailData.user?.email})
                            </p>
                        </Card.Header>
                        <Card.Body className="d-flex flex-column gap-2 readonly">
                            <ReactQuill
                                theme="snow"
                                value={emailData.message}
                                readOnly
                            />
                        </Card.Body>
                    </Card>
                </div>
            </main>
        </>
    );
}
