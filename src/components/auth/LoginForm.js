import { useState } from 'react';
import * as AuthService from './AuthService';
import { useCookies } from 'react-cookie';
import jwt from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();
    const errors = {
      email: "Invalid username",
      password: "Invalid password"
    };
    const initialState = { email: "", password: "" };
    const [user, setUser] = useState(initialState);
    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
  
    const handleSubmit = async (e) => {
      // Prevent page reload
      e.preventDefault();
      let res;
      // Find user login info
      res = await AuthService.login(user);
    //       // Compare data info
      const data = await res.json();
      if (data.token) {
        const uid = jwt(JSON.stringify(data.token));
        setCookie('uid', uid);
        navigate("/home");
      } else if (data.detail === 'User not found') {
        setErrorMessages({ name: "email", message: errors.email });
      } else {
        setErrorMessages({ name: "password", message: errors.password });
      }
    };
  
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <div className="error"><p style={{color: 'red' }}>{errorMessages.message}</p></div>
      );
  
    return (
         // JSX code for login form
         <div className="col-md-3 mx-auto">
         <form onSubmit={handleSubmit}>
           <div className="mb-2">
           <label htmlFor="email" className="form-label">Email</label>
             <input className="form-control" type="text" name="email" id="email" required onChange={handleInputChange}/>
             {renderErrorMessage("email")} 
           </div>
           <div className="input-container">
           <label htmlFor="password" className="form-label">Password</label>
             <input className="form-control" type="password" name="password" id="password" required onChange={handleInputChange}/>
             {renderErrorMessage("password")} 
           </div>
           <div className="d-grid gap-2 mt-5">
           <button type="submit" className="btn btn-block btn-primary">Login</button>
           <button component={Link} to="/register" className="btn btn-block btn-primary">Register</button>
           </div>
         </form>
       </div>
    );
  }
  
  export default Login