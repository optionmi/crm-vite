import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import salespersonAPI from '../../api/salesPersonAPI';
import AuthContext from '../../context/AuthContext';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';

function ViewSalesperson() {
    let { authToken } = useContext(AuthContext);
    const navigate = useNavigate()
    const { id } = useParams();
    const [Message, setMessage] = useState(null)

    const [salesperson, setSalesperson] = useState({
      name: '',
      email: '',
      phone_number: '',
      team:''
    });

    useEffect(() => {
      // Fetch the salesperson by ID when the component mounts
      salespersonAPI
        .getSalespersonById(authToken, id)
        .then((data) => {
          setSalesperson(data);
        })
        .catch((error) => {
          console.error('Error fetching salesperson:', error);
        });
    }, [authToken, id]);


    return (
      <div>
        <Header />
        <Sidebar />
        <div className="publisher">
          <div className="header d-flex justify-content-between">
            <h4>View Salesperson</h4>
            {/* <button className='btn btn-primary create-btn' onClick={handleDelete}>Delete Salesperson</button> */}
          </div>

          <Card className="create-publisher-card shadow-sm" style={{'background': 'white', 'height': 'fit-content'}} >
              <Card.Body className='create-publisher-card-body'>
                  {Message && (
                      <Alert variant='success' className="mb-3">
                          {Message}
                      </Alert>
                  )}
                  <Form className='create-publisher-form'>
                  <div className="row">
                      <div className='col-lg-6 col-md-6 col-12'>
                      <Form.Group controlId="company-name" className='create-publisher-form-group'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control className='form-contol'
                        type="text"
                        value={salesperson.name}
                        name='company_name'
                        onChange={handleInputChange}
                        required
                        />
                      </Form.Group>
                    </div>

                    <div className='col-lg-6 col-md-6 col-12'>
                      <Form.Group className='create-publisher-form-group'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select" disabled>
                          <option value={publisher.country} aria-readonly>{publisher.country}</option>
                        </Form.Control>
                      </Form.Group>
                    </div>

                    <div className='col-lg-6 col-md-6 col-12'>
                      <Form.Group controlId="email" className='create-publisher-form-group'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control className='form-contol'
                        type="email"
                        value={publisher.email}
                        name='email'
                        onChange={handleInputChange}
                        required
                        />
                      </Form.Group>
                    </div>

                    <div className='col-lg-6 col-md-6 col-12'>
                      <Form.Group className='create-publisher-form-group'>
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" disabled>
                          <option value={publisher.state} aria-readonly>{publisher.state}</option>
                        </Form.Control>
                      </Form.Group>
                    </div>

                    <div className='col-lg-6 col-md-6 col-12'>
                      <Form.Group controlId="address" className='create-publisher-form-group'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control className='form-contol'
                        type="text"
                        value={publisher.address}
                        name='address'
                        onChange={handleInputChange}
                        required
                        />
                      </Form.Group>
                    </div>

                    <div className='col-lg-6 col-md-6 col-12'>
                      <Form.Group className='create-publisher-form-group'>
                        <Form.Label>City</Form.Label>
                        <Form.Control as="select" disabled>
                        <option value={publisher.city} aria-readonly>{publisher.city}</option>
                        </Form.Control>
                      </Form.Group>
                    </div>

                    <div className='col-lg-6 col-md-6 col-12'>
                      <Form.Group controlId="contact-person" className='create-publisher-form-group'>
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control className='form-contol'
                        type="text"
                        value={publisher.contact_person}
                        name='contact_person'
                        onChange={handleInputChange}
                        required
                        />
                      </Form.Group>
                    </div>

                    <div className='col-lg-6 col-md-6 col-12'>
                      <Form.Group controlId="postal-code" className='create-publisher-form-group'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control className='form-contol'
                        type="number"
                        value={publisher.postal_code}
                        name='postal_code'
                        onChange={handleInputChange}
                        required
                        />
                      </Form.Group>
                    </div>

                    <div className='col-lg-6 col-md-6 col-12'>
                      <Form.Group controlId="phone-number" className='create-publisher-form-group'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control className='form-contol'
                        type="number"
                        value={publisher.phone_number}
                        name='phone_number'
                        onChange={handleInputChange}
                        required
                        />
                      </Form.Group>
                    </div>

                  </div>

                  <div className='create-form-btn'>
                    <Button variant="primary" type="submit" className="w-100 create-publisher-form-group create-publisher-button" >
                      Save Changes
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>


        </div>
      </div>
    );
}

export default ViewSalesperson