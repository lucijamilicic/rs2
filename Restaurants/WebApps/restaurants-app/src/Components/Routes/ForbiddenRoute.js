import React from 'react';
import { getRole } from '../../common/helpers';
import { Navigate } from "react-router-dom";


const ForbiddenRoute = ({children }) => {

    const role = getRole();

    if (role !== 'Administrator') {
        return <Navigate to="/" />
    }

    return children;
}

export default ForbiddenRoute;