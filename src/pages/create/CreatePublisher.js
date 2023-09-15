import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Card, Form, Button, Container, Row} from 'react-bootstrap';
import publishersApi from '../../api/publisherAPI';

function CreatePublisher() {
  // const handleCreatePublisher = (e) => {
  //   e.preventDefault();
  //   const publisherData = {
  //     name: e.target.name.value,
  //     address: e.target.address.value,
  //     contactInfo: e.target.contact.value,
  //   };
  //   publishersApi
  //     .createPublisher(publisherData)
  //     .then((createdPublisher) => {
  //       setPublishers((prevPublishers) => [...prevPublishers, createdPublisher]);
  //       setNewPublisher({
  //         name: '',
  //         address: '',
  //         contactInfo: '',
  //       });
  //       handleClose();
  //     })
  //     .catch((error) => {
  //       console.error('Error creating publisher:', error);
  //     });
  // };
  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
  ];
  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className="publisher">
          <h4>Create Publisher</h4>
          <Container>
            <Row>
                    <Card className="create-publisher-card shadow-sm" style={{'background': 'white'}} >
                      <Card.Body>
                        <Form className='create-publisher-form'>
                          <Form.Group controlId="company-name" className='create-publisher-form-group'>
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control className='form-contol'
                            type="text"
                            placeholder="Company Name"
                            name='company_name'
                            required
                            />
                          </Form.Group>

                          <Form.Group controlId="email" className='create-publisher-form-group'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control className='form-contol'
                            type="email"
                            placeholder="Email"
                            name='email'
                            required
                            />
                          </Form.Group>

                          <Form.Group controlId="address" className='create-publisher-form-group'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control className='form-contol'
                            type="text"
                            placeholder="Address"
                            name='address'
                            required
                            />
                          </Form.Group>

                          <Form.Group controlId="contact-person" className='create-publisher-form-group'>
                            <Form.Label>Contact Person</Form.Label>
                            <Form.Control className='form-contol'
                            type="text"
                            placeholder="Contact Person"
                            name='contact_person'
                            required
                            />
                          </Form.Group>

                          <Form.Group controlId="phone-number" className='create-publisher-form-group'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control className='form-contol'
                            type="number"
                            placeholder="Phone Number"
                            name='phone_number'
                            required
                            />
                          </Form.Group>

                          <Form.Group controlId="phone-number" className='create-publisher-form-group'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control className='form-contol'
                            type="number"
                            placeholder="Phone Number"
                            name='phone_number'
                            required
                            />
                          </Form.Group>

                          <Form.Group controlId="countrySelect" className='create-publisher-form-group'>
                            <Form.Label>Select Country</Form.Label>
                            <Form.Control as="select">
                              {countries
                              .map((country) => (
                              <option key={country.code} value={country.name}>
                                {country.name}
                              </option>
                              ))}
                            </Form.Control>
                          </Form.Group>





                                <Button variant="primary" type="submit" className="w-100 login-form-group login-button" >
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
            </Row>
        </Container>
        </div>
    </div>
  )
}

export default CreatePublisher