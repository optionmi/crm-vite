import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import salespersonApi from '../api/salesPersonAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus} from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

function Salesperson() {

  const [salesPerson, setsalesPerson] = useState([]);

  const [newSalesPerson, setnewSalesPerson] = useState({
    name: '',
    phone_number:'',
    address: '',
  });

  const [editSalesPerson, setEditSalesPerson] = useState(null); // Track the sales person being edited

  useEffect(() => {
    // Fetch salesperson when the component mounts
    salespersonApi
      .getAllSalespersons()
      .then((data) => {
        setsalesPerson(data);
      })
      .catch((error) => {
        console.error('Error fetching Sales Person:', error);
      });
  }, []);

  const handleCreateSalesPerson = (e) => {
    e.preventDefault();
    const salesPersonData = {
      name: e.target.name.value,
      phone_number: e.target.phone_number.value,
      address: e.target.address.value
    };
    salespersonApi
      .createSalesperson(salesPersonData)
      .then((createdSalesperson) => {
        setsalesPerson((prevsalesPerson) => [...prevsalesPerson, createdSalesperson]);
        setnewSalesPerson({
          name: '',
          phone_number:'',
          address: '',
        });
        handleClose();
      })
      .catch((error) => {
        console.error('Error creating sales person:', error);
      });
  };

  const handleDeleteSalesPerson = (salespersonId) => {
    salespersonApi
      .deleteSalesperson(salespersonId)
      .then(() => {
        setsalesPerson((prevsalesPerson) =>
          prevsalesPerson.filter((salesPerson) => salesPerson.id !== salespersonId)
        );
      })
      .catch((error) => {
        console.error('Error deleting Sales Person:', error);
      });
  };

  const handleEditSalesPerson = (salesPerson) => {
    setEditSalesPerson(salesPerson);
    handleShow();
  };

  const handleUpdateSalesPerson = (e) => {
    e.preventDefault();
    const updatedSalesPersonData = {
      name: e.target.name.value,
      phone_number:e.target.phone_number.value,
      address: e.target.address.value
    };
    const salespersonId = editSalesPerson.id;
    salespersonApi
      .updateSalesperson(salespersonId, updatedSalesPersonData)
      .then((updatedSalesperson) => {
        setsalesPerson((prevsalesPerson) =>
          prevsalesPerson.map((salesPerson) =>
            salesPerson.id === salespersonId ? updatedSalesperson : salesPerson
          )
        );
        setEditSalesPerson(null);
        handleClose();
      })
      .catch((error) => {
        console.error('Error updating Sales Person:', error);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEditSalesPerson(null); // Reset the editSalesPerson state when closing the modal
  };
  const handleShow = () => setShow(true);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="publisher">
        <div className="header d-flex justify-content-between">
          <h4>Salesperson</h4>
          <button onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} id="Add-Icon" /> Add Salespersons
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="shadow-none">
            <Modal.Title className="text-center">
              {editSalesPerson ? 'Edit Sales Person' : 'Add Sales Person'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
            onSubmit={
              editSalesPerson ? handleUpdateSalesPerson : handleCreateSalesPerson
              }
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  value={
                    editSalesPerson
                      ? editSalesPerson.name
                      : newSalesPerson.name
                  }
                  onChange={(e) =>
                    editSalesPerson
                      ? setEditSalesPerson({
                          ...editSalesPerson,
                          name: e.target.value,
                        })
                      : setnewSalesPerson({
                          ...newSalesPerson,
                          name: e.target.value,
                        })
                  }
                  required
                />
              </div>


              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={
                    editSalesPerson
                      ? editSalesPerson.phone_number
                      : newSalesPerson.phone_number
                  }
                  onChange={(e) =>
                    editSalesPerson
                      ? setEditSalesPerson({
                          ...editSalesPerson,
                          phone_number: e.target.value,
                        })
                      : setnewSalesPerson({
                          ...newSalesPerson,
                          phone_number: e.target.value,
                        })
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
                  value={
                    editSalesPerson
                      ? editSalesPerson.address
                      : newSalesPerson.address
                  }
                  onChange={(e) =>
                    editSalesPerson
                      ? setEditSalesPerson({
                          ...editSalesPerson,
                          address: e.target.value,
                        })
                      : setnewSalesPerson({
                          ...newSalesPerson,
                          address: e.target.value,
                        })
                  }
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {editSalesPerson ? 'Update' : 'Submit'}
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
                  <h5>Phone</h5>
                </div>
                <div className="col-3">
                  <h5>Address</h5>
                </div>
                <div className="col-3">
                  <h5>Actions</h5>
                </div>
              </div>
            </div>
        </div>

        {salesPerson.map((salesPerson) => (
        <div className="card" id="detail-card" key={salesPerson.id}>
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                <h6>{salesPerson.name}</h6>
              </div>
              <div className="col-3">
                <h6>{salesPerson.phone_number}</h6>
              </div>
              <div className="col-3">
                <h6>{salesPerson.address}</h6>
              </div>
              <div className="col-3">
                <button
                  onClick={() => handleEditSalesPerson(salesPerson)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>

                <button
                  onClick={() => handleDeleteSalesPerson(salesPerson.id)}
                >
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

export default Salesperson