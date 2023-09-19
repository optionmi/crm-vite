import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
    faCircleUser,
    faEllipsisV,
    faPlus,
    faUsers,
    faBook,
    faUserTie,
    faFilter,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
    let { logoutUser, Name } = useContext(AuthContext);
    return (
        <div>
            <nav className="navbar">
                <div className="container-fluid d-flex">
                    <a
                        className="navbar-brand"
                        style={{ backgroundColor: "transparent" }}
                        href="/"
                    >
                        CRM
                    </a>
                    <div className="d-flex header-btn">
                        <div className="dropdown">
                            <button className="drop-toggle">
                                <div className="circle">
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        id="head-plus"
                                    />
                                </div>
                            </button>
                            <div className="dropdown-menu-1">
                                <div className="row">
                                    <div className="col-4">
                                        <Link
                                            to="/leads/create/1"
                                            className="btn head-btn"
                                        >
                                            <FontAwesomeIcon
                                                icon={faFilter}
                                                className="head-icon icon-left"
                                            />
                                            <h6 className="text-muted">
                                                Leads
                                            </h6>
                                        </Link>
                                    </div>
                                    <div className="col-4">
                                        <a
                                            href="/create/salesperson"
                                            className="btn head-btn"
                                        >
                                            <FontAwesomeIcon
                                                icon={faUsers}
                                                className="head-icon"
                                            />
                                            <h6 className="text-muted">
                                                Person
                                            </h6>
                                        </a>
                                    </div>
                                    <div className="col-4">
                                        <a
                                            href="/create/book"
                                            className="btn head-btn"
                                        >
                                            <FontAwesomeIcon
                                                icon={faBook}
                                                className="head-icon"
                                            />
                                            <h6 className="text-muted">
                                                Books
                                            </h6>
                                        </a>
                                    </div>
                                    <div className="col-4">
                                        <a
                                            href="/create/publisher"
                                            className="btn head-btn"
                                        >
                                            <FontAwesomeIcon
                                                icon={faUserTie}
                                                className="head-icon icon-left"
                                            />
                                            <h6 className="text-muted">
                                                Publisher
                                            </h6>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="drop-toggle">
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
                                    <a href="/">Manage Account</a>
                                </li>
                                <li>
                                    <button
                                        className="btn"
                                        onClick={logoutUser}
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
    );
}

export default Header;
