import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();

    //if a user isn't logged in, we must redirect them to the login page
    if (!currentUser) {
        return <Navigate to="/login" />; //Redirect to login page
    }

    //if user is logged in, render the children components
    //the children components are nested in ProtectedRoute in App.js
    return children; 
};

export default ProtectedRoute;