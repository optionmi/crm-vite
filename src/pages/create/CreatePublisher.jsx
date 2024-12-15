import React, { useState, useContext} from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Card, Form, Button} from 'react-bootstrap';
import publishersApi from '../../api/publisherAPI';
import { Country, State, City }  from 'country-state-city';
import AuthContext from '../../context/AuthContext';
import {useNavigate } from 'react-router-dom';

function CreatePublisher() {

  let {authToken} = useContext(AuthContext)

  const navigate = useNavigate()

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const countries = Country.getAllCountries();
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry): [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry,selectedState) : [];


  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleCreatePublisher = (e) => {

    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;

    if(password===confirm_password){
      e.preventDefault();
      const publisherData = {
        company_name: e.target.company_name.value,
        country: Country.getCountryByCode(selectedCountry).name,
        email:e.target.email.value,
        state: State.getStateByCode(selectedState).name,
        address:e.target.address.value,
        city: selectedCity,
        contact_person: e.target.contact_person.value,
        postal_code: e.target.postal_code.value,
        phone_number: e.target.phone_number.value,
        password: password
      };
      publishersApi
        .createPublisher(publisherData, authToken)
        .then(() => {
          navigate('/publishers')
        })
        .catch((error) => {
          console.error('Error creating publisher:', error);
        });
      } else{
        console.error('password not matched !')
      }
  };

  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className="publisher">
          <h4>Create Publisher</h4>
          <Card className="create-publisher-card shadow-sm" style={{'background': 'white', 'height': 'fit-content'}} >
            <Card.Body className='create-publisher-card-body'>
              <Form className='create-publisher-form' onSubmit={handleCreatePublisher}>
                <div className="row">

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="company-name" className='create-publisher-form-group'>
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control className='form-contol'
                      type="text"
                      placeholder="Company Name"
                      name='company_name'
                      required
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group className='create-publisher-form-group'>
                      <Form.Label>Country</Form.Label>
                      <Form.Control as="select" onChange={handleCountryChange}>
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                      </Form.Control>
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="email" className='create-publisher-form-group'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control className='form-contol'
                      type="email"
                      placeholder="Email"
                      name='email'
                      required
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group className='create-publisher-form-group'>
                      <Form.Label>State</Form.Label>
                      <Form.Control as="select" onChange={handleStateChange} disabled={!selectedCountry}>
                        <option value="">Select a state</option>
                        {states.map((state) => (
                          <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="address" className='create-publisher-form-group'>
                      <Form.Label>Address</Form.Label>
                      <Form.Control className='form-contol'
                      type="text"
                      placeholder="Address"
                      name='address'
                      required
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group className='create-publisher-form-group'>
                      <Form.Label>City</Form.Label>
                      <Form.Control as="select" disabled={!selectedState} onChange={handleCityChange}>
                      <option value="">Select a city</option>
                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                      </Form.Control>
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="contact-person" className='create-publisher-form-group'>
                      <Form.Label>Contact Person</Form.Label>
                      <Form.Control className='form-contol'
                      type="text"
                      placeholder="Contact Person"
                      name='contact_person'
                      required
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="postal-code" className='create-publisher-form-group'>
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control className='form-contol'
                      type="number"
                      placeholder="Postal Code"
                      name='postal_code'
                      required
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-12'>
                    <Form.Group controlId="phone-number" className='create-publisher-form-group'>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control className='form-contol'
                      type="number"
                      placeholder="Phone Number"
                      name='phone_number'
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
                    Create Publisher
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
    </div>
  )
}

export default CreatePublisher