import React from 'react';
import { getAccessToken } from '../../common/helpers';
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children }) => {

    const isUserLogged = getAccessToken();

    if (!isUserLogged) {
       return <Navigate to="/login-register" />;
    }

    return children;
}

export default ProtectedRoute;