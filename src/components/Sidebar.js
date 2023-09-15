import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faUsers, faBook, faUserTie, faFilter} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {

  const location = useLocation(); // Get the current location
  const isActive = (path) => location.pathname === path;

  return (
    <div className='sidebar'>
      <nav className="navbar" id='side-nav'>
          <div className="container-fluid">
              <a className="navbar-brand" style={{ backgroundColor: 'transparent' }} id='brand' href="/">CRM</a>
          </div>
      </nav>
      <ul>
        <li>
          <a href="/" className={isActive('/') ? 'active' : ''}>
            <div className="sidebar-icon d-flex">
              <FontAwesomeIcon icon={faChartPie} id='li-1' />
              <span>Dashboard</span>
            </div>
          </a>
        </li>
        <li>
          <a href="/leads" className={isActive('/leads') ? 'active' : ''}>
            <div className="sidebar-icon d-flex">
              <FontAwesomeIcon icon={faFilter} id='li-1' />
              <span>Leads</span>
            </div>
          </a>
        </li>
        <li>
          <a href="/publishers" className={isActive('/publishers') ? 'active' : ''}>
            <div className="sidebar-icon d-flex">
              <FontAwesomeIcon icon={faUsers} />
              <span>Publishers</span>
            </div>
          </a>
        </li>
        <li>
          <a href="/salesperson" className={isActive('/salesperson') ? 'active' : ''}>
            <div className="sidebar-icon d-flex">
              <FontAwesomeIcon icon={faUserTie} />
              <span>Salesperson</span>
            </div>
          </a>
        </li>
        <li>
          <a href="/books" className={isActive('/books') ? 'active' : ''}>
            <div className="sidebar-icon d-flex">
              <FontAwesomeIcon icon={faBook} />
              <span>Books</span>
            </div>
          </a>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;