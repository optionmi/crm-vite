import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartPie,
    faUsers,
    faBook,
    faUserTie,
    faFilter,
    faGraduationCap,
    faBookAtlas,
    faBookOpen,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation(); // Get the current location
    const isActive = (path) => location.pathname === path;

    return (
        <div className="sidebar">
            <nav className="navbar" id="side-nav">
                <div className="container-fluid">
                    <Link
                        className="navbar-brand"
                        style={{ backgroundColor: "transparent" }}
                        id="brand"
                        to="/"
                    >
                        CRM
                    </Link>
                </div>
            </nav>
            <ul>
                <li>
                    <Link to="/" className={isActive("/") ? "active" : ""}>
                        <div className="sidebar-icon d-flex">
                            <FontAwesomeIcon icon={faChartPie} id="li-1" />
                            <span>Dashboard</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/boards"
                        className={isActive("/boards") ? "active" : ""}
                    >
                        <div className="sidebar-icon d-flex">
                            <FontAwesomeIcon icon={faGraduationCap} id="li-1" />
                            <span>Boards</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/subjects"
                        className={isActive("/subjects") ? "active" : ""}
                    >
                        <div className="sidebar-icon d-flex">
                            <FontAwesomeIcon icon={faBookAtlas} id="li-1" />
                            <span>Subjects</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/series"
                        className={isActive("/series") ? "active" : ""}
                    >
                        <div className="sidebar-icon d-flex">
                            <FontAwesomeIcon icon={faBookOpen} id="li-1" />
                            <span>Series</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/books"
                        className={isActive("/books") ? "active" : ""}
                    >
                        <div className="sidebar-icon d-flex">
                            <FontAwesomeIcon icon={faBook} />
                            <span>Books</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/leads"
                        className={isActive("/leads") ? "active" : ""}
                    >
                        <div className="sidebar-icon d-flex">
                            <FontAwesomeIcon icon={faFilter} id="li-1" />
                            <span>Leads</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/quotes"
                        className={isActive("/quotes") ? "active" : ""}
                    >
                        <div className="sidebar-icon d-flex">
                            <FontAwesomeIcon icon={faFilter} id="li-1" />
                            <span>Quotes</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/publishers"
                        className={isActive("/publishers") ? "active" : ""}
                    >
                        <div className="sidebar-icon d-flex">
                            <FontAwesomeIcon icon={faUsers} />
                            <span>Publishers</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/salesperson"
                        className={isActive("/salesperson") ? "active" : ""}
                    >
                        <div className="sidebar-icon d-flex">
                            <FontAwesomeIcon icon={faUserTie} />
                            <span>Salesperson</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/track"
                        className={isActive("/track") ? "active" : ""}
                    >
                        <div className="sidebar-icon d-flex">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>Track</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
