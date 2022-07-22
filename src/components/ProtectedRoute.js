import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const ProtectedRoute = ({children}) => {
    let { user } = useUserAuth();

    if(!user) {
       return <Navigate to="/login" />;
    }
    return children;

    // return ( user ? <Outlet /> : <Navigate to="/login" /> );
};

export default ProtectedRoute;