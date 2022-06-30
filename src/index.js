import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Components
//import DepartmentList from './components/Department/DepartmentList';
import EmployeeList from './components/Employee/EmployeeList';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import EmployeeForm from './components/Employee/EmployeeForm';
import NavBar from './components/Navbar/Navbar';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from './components/auth/NotFound';
import Profile from './components/user/Profile';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <NavBar />
    <div className="container my-4">
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/home" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
        <Route path="/employee-form" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />
        <Route path="/update-employee/:id" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </BrowserRouter>
);
