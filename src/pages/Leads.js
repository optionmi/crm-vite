import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function Leads() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className="publisher">
            <div className='d-flex justify-content-between'>
              <h4>Leads</h4>
              <a className='btn btn-primary' id='create-leads' href='/leads'>Create Leads</a>
            </div>

            <div className="card-list">
              <div className="card rounded-lg shadow-sm">
                <div className="card-body">
                  <div className="title d-flex justify-content-between">
                    <h5 className="card-title">New</h5>
                    <h5 className='lead-price'>&#8377; 0.00</h5>
                  </div>
                  <a className='btn btn-outline-primary' id='card-create-leads' href="/leads/create">Create Leads</a>
                </div>
              </div>
              <div className="card rounded-lg shadow-sm">
                <div className="card-body">
                  <div className="title d-flex justify-content-between">
                    <h5 className="card-title">Follow-Up</h5>
                    <h5 className='lead-price'>&#8377; 0.00</h5>
                  </div>
                  <a className='btn btn-outline-primary' id='card-create-leads' href="/leads/create">Create Leads</a>
                </div>
              </div>
              <div className="card rounded-lg shadow-sm">
                <div className="card-body">
                  <div className="title d-flex justify-content-between">
                    <h5 className="card-title">Visit</h5>
                    <h5 className='lead-price'>&#8377; 0.00</h5>
                  </div>
                  <a className='btn btn-outline-primary' id='card-create-leads' href="/leads/create">Create Leads</a>
                </div>
              </div>
              <div className="card rounded-lg shadow-sm">
                <div className="card-body">
                  <div className="title d-flex justify-content-between">
                    <h5 className="card-title">Negotiation</h5>
                    <h5 className='lead-price'>&#8377; 0.00</h5>
                  </div>
                  <a className='btn btn-outline-primary' id='card-create-leads' href="/leads/create">Create Leads</a>
                </div>
              </div>
              <div className="card rounded-lg shadow-sm">
                <div className="card-body">
                  <div className="title d-flex justify-content-between">
                    <h5 className="card-title">Won</h5>
                    <h5 className='lead-price'>&#8377; 0.00</h5>
                  </div>
                  <a className='btn btn-outline-primary' id='card-create-leads' href="/leads/create">Create Leads</a>
                </div>
              </div>
              <div className="card rounded-lg shadow-sm">
                <div className="card-body">
                  <div className="title d-flex justify-content-between">
                    <h5 className="card-title">Lost</h5>
                    <h5 className='lead-price'>&#8377; 0.00</h5>
                  </div>
                  <a className='btn btn-outline-primary' id='card-create-leads' href="/leads/create">Create Leads</a>
                </div>
              </div>
            </div>

        </div>
    </div>
  )
}

export default Leads