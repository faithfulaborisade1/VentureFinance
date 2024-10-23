import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Router components
import Signup from './components/SignupPage/Signup';
import Login from './components/LoginPage/Login';
import Dashboard from './components/DashboardPage/Dashboard';
import './App.css';
import Profile from './components/ProfilePage/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes for Signup and Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/profile" element={<Profile/>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
