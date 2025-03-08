import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return token;
    };

    return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/" />;
};

export default AuthRoute;