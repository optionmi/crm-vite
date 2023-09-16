import React, {useContext} from 'react'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Card, Form, Button} from 'react-bootstrap';

function createBook() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className="publisher">
          <h4>Create Book</h4>
          <Card className="create-publisher-card shadow-sm" style={{'background': 'white', 'height': 'fit-content'}} >
            <Card.Body className='create-publisher-card-body'>
              <Form className='create-publisher-form'>
                <div className="row">

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="name" className='create-publisher-form-group'>
                      <Form.Label>Title</Form.Label>
                      <Form.Control className='form-contol'
                      type="text"
                      placeholder="Name"
                      name='name'
                      required
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="author" className='create-publisher-form-group'>
                      <Form.Label>Author</Form.Label>
                      <Form.Control className='form-contol'
                      type="text"
                      placeholder="Author"
                      name='author'
                      required
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="standard" className='create-publisher-form-group'>
                      <Form.Label>Standard</Form.Label>
                      <Form.Control className='form-contol'
                      type="text"
                      placeholder="Standard"
                      name='standard'
                      required
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="subject" className='create-publisher-form-group'>
                      <Form.Label>Subject</Form.Label>
                      <Form.Control className='form-contol'
                      type="text"
                      placeholder="Subject"
                      name='subject'
                      required
                      />
                    </Form.Group>
                  </div>


                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="price" className='create-publisher-form-group'>
                      <Form.Label>Price</Form.Label>
                      <Form.Control className='form-contol'
                      type="number"
                      placeholder="Price"
                      name='price'
                      required
                      />
                    </Form.Group>
                  </div>

                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <Form.Group controlId="password" className='create-publisher-form-group'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control className='form-contol'
                      type="password"
                      placeholder="Password"
                      name='password'
                      required
                      />
                    </Form.Group>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">
                    <Form.Group controlId="confirm-password" className='create-publisher-form-group'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control className='form-contol'
                      type="password"
                      placeholder="Confirm Password"
                      name='confirm_password'
                      required
                      />
                    </Form.Group>
                  </div>

                </div>

                <div className='create-form-btn'>
                  <Button variant="primary" type="submit" className="w-100 create-publisher-form-group create-publisher-button" >
                    Create Book
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
    </div>
  )
}

export default createBook