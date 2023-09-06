import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function Home() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className="home">
          <h4>Home</h4>
        </div>
    </div>
  )
}

export default Home