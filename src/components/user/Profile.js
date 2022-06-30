import React, { useEffect, useState } from "react";
import * as AuthService from '../auth/AuthService';

const Profile = () => {
    const initialState = { name: "", email: "" };
    const [user, setUser]=useState(initialState);
    const getUser = async () => {
        try {
            const res = await AuthService.getUser();
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

useEffect(()=> {
    getUser();
}, []);
    
    return (
        <div className="col-md-3 mx-auto">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input disabled type="text" name="employeeName" id="name" value={user.name} />
      </div>
      <div className="mb-3">
      <label htmlFor="department" className="form-label">E-mail</label>
        <input disabled type="text" name="Department" id="department" value={user.email} />
      </div>
    </div>
    );
};

export default Profile;