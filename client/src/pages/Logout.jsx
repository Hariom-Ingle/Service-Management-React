import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
 import { useAuth } from '../store/auth';

export const   Logout =()=>{
    const {LogoutUser}=useAuth();  
    useEffect (()=>{
        LogoutUser();

    },[LogoutUser]);

    return   <Navigate to="/login"/>
}
 