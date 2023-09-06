import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function Salesperson() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className="home">
          <h4>SalesPerson</h4>
        </div>
    </div>
  )
}

export default Salesperson