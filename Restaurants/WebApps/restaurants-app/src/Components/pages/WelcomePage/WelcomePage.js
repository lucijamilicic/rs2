import React, { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { getRecipes } from '../../../api/Service';
import RecipesList from '../../RecipesList/RecipesList';

const WelcomePage = () => {
    const navigate = useNavigate();
    const accToken = localStorage.getItem("accessToken") ? true : false;
    const isLogged = () => {
        const token = localStorage.getItem("accessToken");
        if (token===null) {
            navigate('/login-register');
        }
    };

    return (<>
        <div></div>
    </>
    );
};


export default WelcomePage;