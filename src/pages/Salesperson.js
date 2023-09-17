import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import salespersonApi from '../api/salesPersonAPI';
import AuthContext from '../context/AuthContext';


function Salesperson() {
  let {authToken} = useContext(AuthContext)
  const [salesPerson, setsalesPerson] = useState([]);

  useEffect(() => {
    // Fetch salesperson when the component mounts
    salespersonApi
      .getAllSalespersons(authToken)
      .then((data) => {
        setsalesPerson(data);
      })
      .catch((error) => {
        console.error('Error fetching Sales Person:', error);
      });
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="publisher">
        <div className="header d-flex justify-content-between">
          <h4>Salesperson</h4>
          <a className='btn btn-primary create-btn' href='/create/salesperson'>Create Salesperson</a>
        </div>

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
                  <h5>Team</h5>
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
                      <h6>{salesPerson.team}</h6>
                    </div>
                  </div>
                </div>
                </div>
              ))}

            </div>
        </div>
      </div>
    </div>

  );
}

export default Salesperson