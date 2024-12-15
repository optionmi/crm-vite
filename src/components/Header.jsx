import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faEllipsisV,
    faPlus,
    faUsers,
    faBook,
    faUserTie,
    faFilter,
    faClipboardUser,
    faBookBookmark,
    faPlane,
    faFile,
    faGraduationCap,
    faBookOpen,
    faBookAtlas,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ToastNotification from "./ToastNotification";
import { Dropdown } from "react-bootstrap";
import emailAPI from "../api/emailAPI";

function Header({ notification }) {
    const { logoutUser, Name, authToken } = useContext(AuthContext);
    const [showToast, setShowToast] = useState(true);

    const [emailNotifications, setEmailNotifications] = useState([]);
    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await emailAPI.getEmailNotifications(authToken);
                setEmailNotifications(data.emails);
            };
            fetchData();
        } catch (error) {
            console.error("Error fetching Email Notifications:", error);
        }
    }, []);

    return (
        <>
            <ToastNotification
                type={notification?.type}
                message={notification?.message}
                showToast={
                    notification === undefined
                        ? false
                        : notification?.show && showToast
                }
                closeToast={() => setShowToast(false)}
            />

            <div className="header">
                <nav className="navbar">
                    <div className="container-fluid d-flex">
                        <Link
                            className="navbar-brand"
                            style={{ backgroundColor: "transparent" }}
                            to="/"
                        >
                            CRM
                        </Link>
                        <div className="d-flex header-btn align-items-center gap-2">
                            {emailNotifications?.length > 0 && (
                                <div className="dropdown">
                                    <button className="drop-toggle text-capitalize">
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            id="user-icon"
                                        />
                                    </button>
                                    <ul className="dropdown-menu">
                                        {emailNotifications?.map((email) => (
                                            <li key={email.id}>
                                                <Link
                                                    to={`/emails/view-email/${email.id}`}
                                                >
                                                    {email.subject}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="dropdown">
                                <button className="drop-toggle">
                                    <div className="circle">
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            id="head-plus"
                                        />
                                    </div>
                                </button>
                                <div className="dropdown-menu-1 justify-content-center">
                                    <div className="row">
                                        <div className="col-4 cell d-flex justify-content-center align-items-center">
                                            <Link
                                                to="/leads/create/1"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faFilter}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Leads
                                                </h6>
                                            </Link>
                                        </div>
                                        <div className="col-4 cell d-flex justify-content-center align-items-center">
                                            <Link
                                                to="/create/salesperson"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUsers}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Person
                                                </h6>
                                            </Link>
                                        </div>
                                        <div className="col-4 cell d-flex justify-content-center align-items-center">
                                            <Link
                                                to="/create/book"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBook}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Books
                                                </h6>
                                            </Link>
                                        </div>
                                        <div className="col-4 cell d-flex justify-content-center align-items-center">
                                            <Link
                                                to="/create/publisher"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUserTie}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Publisher
                                                </h6>
                                            </Link>
                                        </div>
                                        <div className="col-4 cell d-flex justify-content-center align-items-center">
                                            <Link
                                                to="/attendance"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faClipboardUser}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Attendance
                                                </h6>
                                            </Link>
                                        </div>
                                        <div className="col-4 cell d-flex justify-content-center align-items-center">
                                            <Link
                                                to="/create/sample"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBookBookmark}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Sample
                                                </h6>
                                            </Link>
                                        </div>
                                        <div className="col-4 cell d-flex justify-content-center align-items-center">
                                            <Link
                                                to="/travelling-expense"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlane}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Expense
                                                </h6>
                                            </Link>
                                        </div>
                                        <div className="col-4 cell d-flex justify-content-center align-items-center">
                                            <Link
                                                to="/travelling-claim"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faFile}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Claim
                                                </h6>
                                            </Link>
                                        </div>
                                        <div className="col-4 cell d-flex justify-content-center align-items-center">
                                            <Link
                                                to="/boards"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faGraduationCap}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Boards
                                                </h6>
                                            </Link>
                                        </div>
                                        <div className="col-4 cell d-flex justify-content-center align-items-center">
                                            <Link
                                                to="/series"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBookOpen}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Series
                                                </h6>
                                            </Link>
                                        </div>
                                        <div className="col-4 cell d-flex justify-content-center align-items-center">
                                            <Link
                                                to="/subjects"
                                                className="btn head-btn"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBookAtlas}
                                                    className="head-icon"
                                                />
                                                <h6 className="text-muted">
                                                    Subject
                                                </h6>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dropdown">
                                <button className="drop-toggle text-capitalize">
                                    <FontAwesomeIcon
                                        icon={faCircleUser}
                                        id="user-icon"
                                    />{" "}
                                    &#160; Hello {Name !== null ? Name : "User"}
                                    <FontAwesomeIcon
                                        icon={faEllipsisV}
                                        style={{ marginLeft: "10px" }}
                                    />
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/manage-account">
                                            Manage Account
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="btn"
                                            onClick={logoutUser}
                                            style={{ paddingLeft: 0 }}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Header;
