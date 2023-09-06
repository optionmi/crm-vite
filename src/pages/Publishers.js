import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import publishersApi from '../api/publisherAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [newPublisher, setNewPublisher] = useState({
    name: '',
    address: '',
    contactInfo: '',
  });

  useEffect(() => {
    // Fetch publishers when the component mounts
    publishersApi
      .getAllPublishers()
      .then((data) => {
        setPublishers(data);
      })
      .catch((error) => {
        console.error('Error fetching publishers:', error);
      });
  }, []);

  const handleDeletePublisher = (publisherId) => {
    publishersApi
      .deletePublisher(publisherId)
      .then(() => {
        setPublishers((prevPublishers) =>
          prevPublishers.filter((publisher) => publisher.id !== publisherId)
        );
      })
      .catch((error) => {
        console.error('Error deleting publisher:', error);
      });
  };

  const handleCreatePublisher = (e) => {
    e.preventDefault();
    const publisherData = {
      name: e.target.name.value,
      address: e.target.address.value,
      contactInfo: e.target.contact.value, // Use 'contact' as the name attribute
    };
    publishersApi
      .createPublisher(publisherData)
      .then((createdPublisher) => {
        setPublishers((prevPublishers) => [...prevPublishers, createdPublisher]);
        // Reset the form inputs
        setNewPublisher({
          name: '',
          address: '',
          contactInfo: '',
        });
      })
      .catch((error) => {
        console.error('Error creating publisher:', error);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="publisher">
        <div className="header d-flex justify-content-between">
          <h4>Publishers</h4>
          <button onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} id="Add-Icon" /> Add Publishers
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="shadow-none">
            <Modal.Title className="text-center">Add Publisher</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleCreatePublisher}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  value={newPublisher.name}
                  onChange={(e) =>
                    setNewPublisher({ ...newPublisher, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Address"
                  value={newPublisher.address}
                  onChange={(e) =>
                    setNewPublisher({ ...newPublisher, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact">Contact Info</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact"
                  placeholder="Contact Info"
                  value={newPublisher.contactInfo}
                  onChange={(e) =>
                    setNewPublisher({
                      ...newPublisher,
                      contactInfo: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleClose}>
                Submit
              </button>
            </form>
          </Modal.Body>
        </Modal>

        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                <h5>Name</h5>
              </div>
              <div className="col-3">
                <h5>Address</h5>
              </div>
              <div className="col-3">
                <h5>Contact</h5>
              </div>
            </div>
          </div>
        </div>
        {publishers.map((publisher) => (
          <div className="card" id="detail-card" key={publisher.id}>
            <div className="card-body">
              <div className="row">
                <div className="col-3">
                  <h6>{publisher.name}</h6>
                </div>
                <div className="col-3">
                  <h6>{publisher.address}</h6>
                </div>
                <div className="col-3">
                  <h6>{publisher.contactInfo}</h6>
                </div>
                <div className="col-3">
                  <button>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button onClick={() => handleDeletePublisher(publisher.id)}>
                    <FontAwesomeIcon id="trash-icon" icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Publishers;

