import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBook, faUserTie} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {

  const location = useLocation(); // Get the current location
  const isActive = (path) => location.pathname === path;

  return (
    <div className='sidebar'>
      <ul>
        <li>
          <a href="/" className={isActive('/') ? 'active' : ''} data-toggle="tooltip" data-placement="right" title="Home">
            <FontAwesomeIcon icon={faHome} id='li-1' />
          </a>
        </li>
        <li>
          <a href="/publishers" className={isActive('/publishers') ? 'active' : ''} data-toggle="tooltip" data-placement="right" title="Publishers">
            <FontAwesomeIcon icon={faUsers} />
          </a>
        </li>
        <li>
          <a href="/salesperson" className={isActive('/salesperson') ? 'active' : ''} data-toggle="tooltip" data-placement="right" title="SalesPerson">
            <FontAwesomeIcon icon={faUserTie} />
          </a>
        </li>
        <li>
          <a href="/books" className={isActive('/books') ? 'active' : ''} data-toggle="tooltip" data-placement="right" title="Books">
            <FontAwesomeIcon icon={faBook} />
          </a>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;