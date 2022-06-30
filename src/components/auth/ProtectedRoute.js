import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import * as AuthService from '../auth/AuthService';

const ProtectedRoute = ({ children }) => {
    const [isUserLogged, setUser]=useState('');
    const getUser= async ()=> {
        try {
            const res = await AuthService.getUser();
            const data = await res.json();
            console.log(data);
            setUser(data);   
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=> {
        getUser();
    }, []);
    
    return (
        isUserLogged.detail !== 'Unauthenticated' ? children : <Navigate  to="/login" />
    );
}

export default ProtectedRoute;