import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as AuthService from './AuthService';

const SignUpForm = () => {
const navigate = useNavigate();
const initialState = { employeeName: "", Department: "", photoFilename: "" };
const [user, setUser] = useState(initialState);
const handleInputChange = (e) => {
  setUser({ ...user, [e.target.name]: e.target.value });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      let res = await AuthService.registerUser(user);
      const data = await res.json();
      if (data) {
        setUser(initialState);
      }
    navigate("/login");
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="col-md-3 mx-auto">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" name="username" className="form-control" id="name" value={user.name} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
      <label htmlFor="department" className="form-label">E-mail</label>
        <input type="text" name="email" className="form-control" id="department" value={user.email} onChange={handleInputChange} />
      </div>
      <div className="mb-3">
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-block btn-success">Register</button>
      </div>
    </form>
    </div>
  )
}

export default SignUpForm