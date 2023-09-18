import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Publishers from './pages/Publishers'
import Salesperson from './pages/Salesperson'
import Books from './pages/Books'
import Leads from './pages/Leads';
import Login from './pages/Login';
import CreatePublisher from './pages/create/CreatePublisher';
import CreateSalesperson from './pages/create/CreateSalesperson';
import CreateBook from './pages/create/createBook';
import ViewPublisher from './pages/view/ViewPublisher';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import './App.css';
import './styles/sidebar.css'
import './styles/Header.css'
import './styles/home.css'
import './styles/publisher.css'
import './styles/leads.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home/>} />
            {/* Publisher Routes */}
            <Route exact path="/publishers" element={<Publishers/>} />
            <Route exact path="/create/publisher" element={<CreatePublisher/>} />
            <Route exact path="/publisher/view/:id" element={<ViewPublisher/>} />
            {/* Salesperson Routes */}
            <Route exact path="/salesperson" element={<Salesperson/>} />
            <Route exact path="/create/salesperson" element={<CreateSalesperson/>} />
            {/* Books Routes */}
            <Route exact path="/books" element={<Books/>} />
            <Route exact path="/create/book" element={<CreateBook/>} />
            {/* Leads */}
            <Route exact path="/leads" element={<Leads/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
