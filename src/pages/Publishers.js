import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import publishersApi from '../api/publisherAPI';
import AuthContext from '../context/AuthContext';


function Publishers() {
  let {authToken} = useContext(AuthContext)
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    // Fetch publishers when the component mounts
    publishersApi
      .getAllPublishers(authToken)
      .then((data) => {
        setPublishers(data);
      })
      .catch((error) => {
        console.error('Error fetching publishers:', error);
      });
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="publisher">
        <div className="header d-flex justify-content-between">
          <h4>Publishers</h4>
        </div>

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
                    <div className="col-3">
                      <h5>Actions</h5>
                    </div>
                  </div>
                </div>
              </div>
              {[publishers].map((publisher) => (
                <div className="card" id="detail-card" key={publisher.id}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3">
                        <h6>{publisher.company_name}</h6>
                      </div>
                      <div className="col-3">
                        <h6>{publisher.address}</h6>
                      </div>
                      <div className="col-3">
                        <h6>{publisher.phone_number}</h6>
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
