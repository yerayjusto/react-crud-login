import React, { useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";
import * as AuthService from '../auth/AuthService';
import { useCookies } from "react-cookie";

const Navbar = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const handleLogout = async (e) => {
        //Prevent page reload
        e.preventDefault();
        // Logout
        try {
            const res = await AuthService.logout();
            const data = await res.json();
            if (data.message === 'Logged out') {
                removeCookie('uid');
                navigate("/");
                //window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=> {
        console.log(cookies);
    }, [cookies]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <span className="navbar-brand">Reac App + Django</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggle-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/employee-form">Add Employee</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
                </li>
            </ul>
            </div>
            <div className="justify-content-end">
            <button onClick={handleLogout} 
            style={{ display: cookies.uid ? 'block' : 'none' }}
            type="button" className="btn btn-outline-danger">Log Out</button>

            </div>
        </div>
        </nav>
    )
};

export default Navbar