import React, {useContext} from 'react'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Card, Form, Button} from 'react-bootstrap';
import booksAPI from '../../api/booksAPI';
import AuthContext from '../../context/AuthContext';
import {useNavigate } from 'react-router-dom';

function CreateBook() {

  let {authToken} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleCreateBook = (e) => {
    const bookData = {
      title: e.target.title.value,
      author: e.target.author.value,
      standard: e.target.standard.value,
      subject: e.target.subject.value,
      price: e.target.price.value
    }

    booksAPI.createBook(bookData, authToken)
    .then(() => {
      navigate('/books')
    }).catch((error) => {
      console.error('Error creating book:', error);
    });

  };

  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className="publisher">
          <h4>Create Book</h4>
          <Card className="create-publisher-card shadow-sm" style={{'background': 'white', 'height': 'fit-content'}} >
            <Card.Body className='create-publisher-card-body'>
              <Form className='create-publisher-form' onSubmit={handleCreateBook}>
                <div className="row">

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="name" className='create-publisher-form-group'>
                      <Form.Label>Title</Form.Label>
                      <Form.Control className='form-contol'
                      type="text"
                      placeholder="Title"
                      name='title'
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

                  <div className="col-lg-6 col-md-6 col-12">
                    <Form.Group controlId="standard" className="create-publisher-form-group">
                      <Form.Label>Standard</Form.Label>
                      <Form.Control as="select" className="form-control" name="standard" required>
                        <option value="">Select a standard</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={`Class ${i + 1}`}>
                            Class {i + 1}
                          </option>
                        ))}
                      </Form.Control>
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

export default CreateBook