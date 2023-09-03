import React, { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import RestaurantsList from "../../RestaurantsList/RestaurantsList"
import { getRecipes } from '../../../api/Service';
import RecipesList from '../../RecipesList/RecipesList';


const WelcomePage = ({ state }) => {
    const { isRestaurant, searched, category } = state;
    console.log(category);
    const navigate = useNavigate();
    const accToken = localStorage.getItem("accessToken") ? true : false;
    const isLogged = () => {
        const token = localStorage.getItem("accessToken");
        if (token===null) {
            navigate('/login-register');
        }
    };

    return (
        <>
            {
                isRestaurant ? (
                    <RestaurantsList searchedRestaurant={searched} />
                ) : (
                    <RecipesList searchedRecipe={searched} searchedCategory={category} />
                )
            }
        </>
    );
};


export default WelcomePage;