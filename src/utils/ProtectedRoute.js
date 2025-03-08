import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return token;
    };

    return isAuthenticated() ? <Navigate to="/dashboard/notes" /> : element;
}

export default ProtectedRoute;