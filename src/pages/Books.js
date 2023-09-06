import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function Books() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className="home">
          <h4>Books</h4>
        </div>
    </div>
  )
}

export default Books