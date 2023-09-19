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
import ViewSalesperson from './pages/view/ViewSalesperson';
import ViewAccount from './pages/view/viewAccount';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import './App.css';
import './styles/sidebar.css'
import './styles/Header.css'
import './styles/home.css'
import './styles/publisher.css'
import './styles/leads.css'
import Attendance from './pages/Attendance';
import CreateAttendance from './pages/create/CreateAttendance';
import Expense from './pages/Expense';
import CreateExpense from './pages/create/CreateExpense';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/manage-account" element={<ViewAccount/>} />

            {/* Publisher Routes */}
            <Route exact path="/publishers" element={<Publishers/>} />
            <Route exact path="/create/publisher" element={<CreatePublisher/>} />
            <Route exact path="/publisher/view/:id" element={<ViewPublisher/>} />
            {/* Salesperson Routes */}
            <Route exact path="/salesperson" element={<Salesperson/>} />
            <Route exact path="/create/salesperson" element={<CreateSalesperson/>} />
            <Route exact path="/attendance" element={<Attendance/>} />
            <Route exact path="/create/attendance" element={<CreateAttendance/>} />
            <Route exact path="/salesperson/view/:id" element={<ViewSalesperson/>} />
            {/* Books Routes */}
            <Route exact path="/books" element={<Books/>} />
            <Route exact path="/create/book" element={<CreateBook/>} />
            {/* Leads */}
            <Route exact path="/leads" element={<Leads/>} />
            {/* Travelling Expense */}
            <Route exact path="/travelling-expense" element={<Expense/>} />
            <Route exact path="/create/travelling-expense" element={<CreateExpense/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
