import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Publishers from './pages/Publishers'
import Salesperson from './pages/Salesperson'
import Books from './pages/Books'
import './App.css';
import './styles/sidebar.css'
import './styles/Header.css'
import './styles/home.css'
import './styles/publisher.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/publishers" element={<Publishers/>} />
        <Route exact path="/salesperson" element={<Salesperson/>} />
        <Route exact path="/books" element={<Books/>} />
      </Routes>
    </Router>
  );
}

export default App;
