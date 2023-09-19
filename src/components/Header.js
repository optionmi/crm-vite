import React , {useContext} from 'react'
import AuthContext from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faEllipsisV, faPlus,
  faUsers, faBook, faUserTie, faFilter, faClipboardUser, faBookBookmark,
faPlane, faFile, faGraduationCap, faBookOpen, faBookAtlas} from '@fortawesome/free-solid-svg-icons';


function Header() {
  let {logoutUser, Name } = useContext(AuthContext)
  return (
    <div>
        <nav className="navbar">
            <div className="container-fluid d-flex">
                <a className="navbar-brand" style={{ backgroundColor: 'transparent' }} href="/">CRM</a>
                <div className='d-flex header-btn'>

                  <div className="dropdown">
                    <button className="drop-toggle">
                      <div className="circle">
                        <FontAwesomeIcon icon={faPlus} id='head-plus' />
                      </div>
                    </button>
                    <div className="dropdown-menu-1 justify-content-center">
                      <div className="row">
                        <div className="col-4 cell">
                          <a href='/create/leads' className='btn head-btn'>
                            <FontAwesomeIcon icon={faFilter} className='head-icon icon-left' />
                            <h6 className='text-muted'>Leads</h6>
                          </a>
                        </div>
                        <div className="col-4 cell">
                          <a href='/create/salesperson' className='btn head-btn'>
                            <FontAwesomeIcon icon={faUsers} className='head-icon' />
                            <h6 className='text-muted'>Person</h6>
                          </a>
                        </div>
                        <div className="col-4 cell">
                          <a href='/create/book' className='btn head-btn'>
                            <FontAwesomeIcon icon={faBook} className='head-icon' />
                            <h6 className='text-muted'>Books</h6>
                          </a>
                        </div>
                        <div className="col-4 cell">
                          <a href='/create/publisher' className='btn head-btn'>
                            <FontAwesomeIcon icon={faUserTie} className='head-icon icon-left' />
                            <h6 className='text-muted text-move'>Publisher</h6>
                          </a>
                        </div>
                        <div className="col-4 cell">
                          <a href='/attendance' className='btn head-btn'>
                            <FontAwesomeIcon icon={faClipboardUser} className='head-icon' />
                            <h6 className='text-muted text-move'>Attendance</h6>
                          </a>
                        </div>
                        <div className="col-4 cell">
                          <a href='/' className='btn head-btn'>
                            <FontAwesomeIcon icon={faBookBookmark} className='head-icon' />
                            <h6 className='text-muted'>Sample</h6>
                          </a>
                        </div>
                        <div className="col-4 cell">
                          <a href='/travelling-expense' className='btn head-btn'>
                            <FontAwesomeIcon icon={faPlane} className='head-icon icon-left' />
                            <h6 className='text-muted text-move'>Expense</h6>
                          </a>
                        </div>
                        <div className="col-4 cell">
                          <a href='/attendance' className='btn head-btn'>
                            <FontAwesomeIcon icon={faFile} className='head-icon' />
                            <h6 className='text-muted text-move'>Claim</h6>
                          </a>
                        </div>
                        <div className="col-4 cell">
                          <a href='/attendance' className='btn head-btn'>
                            <FontAwesomeIcon icon={faGraduationCap} className='head-icon' />
                            <h6 className='text-muted text-move'>Boards</h6>
                          </a>
                        </div>
                        <div className="col-4 cell">
                          <a href='/create/publisher' className='btn head-btn'>
                            <FontAwesomeIcon icon={faBookOpen} className='head-icon icon-left' />
                            <h6 className='text-muted text-move'>Series</h6>
                          </a>
                        </div>
                        <div className="col-4 cell">
                          <a href='/attendance' className='btn head-btn'>
                            <FontAwesomeIcon icon={faBookAtlas} className='head-icon' />
                            <h6 className='text-muted text-move'>Subject</h6>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown">
                    <button className="drop-toggle text-capitalize">
                      <FontAwesomeIcon icon={faCircleUser} id='user-icon' /> &#160;  Hello {Name !== null ? Name : 'User'}
                      <FontAwesomeIcon icon={faEllipsisV} style={{ marginLeft: '10px' }} />
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href="/manage-account">Manage Account</a></li>
                      <li><button className='btn' onClick={logoutUser}>Logout</button></li>
                    </ul>
                  </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header