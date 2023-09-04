import { getRecipes, getRecipesByCategory } from "../../api/Service";
import RecipesListItem from "../RecipesListItem/RecipesListItem"
import React, { useEffect, useState } from 'react';
import "./RecipesList.css"
import AddRecipe from "../AddRecipes/AddRecipe";
import { useNavigate } from 'react-router-dom'; 
import jwt_decode from 'jwt-decode';

const RecipesList = ({ searchedRecipe, searchedCategory }) => {

	const [recipes, setRecipes] = useState([]);
	const [showAdd, setShowAdd] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		const decodedToken = jwt_decode(token)

		const role = Object.keys(decodedToken).map(key => {

			if (key.includes('role')) {
				return decodedToken[key];
			}
			return null;
		}).find(elem => elem !== null);

		if (role === "Administrator") {
			setShowAdd(true);
		}

	}, []);

	const addNewHandler = () => {
		navigate('/addRecipe');
	};

	useEffect(() => {

		const getAllRecipes = async () => {
			const recipes = await getRecipes().then(response => response.data).catch(error => []);
			setRecipes(recipes);
		}

		const getRecipesByName = async () => {
			const recipes = await getRecipesByName(searchedRecipe).then(response => response.data).catch(error => []);
			setRecipes(recipes);
		}

		getAllRecipes();

	}, []);

	useEffect(() => {

		const getAllRecipesInCategory = async () => {
			const recipes = await getRecipesByCategory(searchedCategory).then(response => response.data).catch(error => []);
			setRecipes(recipes);
		}

		searchedCategory && getAllRecipesInCategory();

	}, [searchedCategory])


	return (<>
		<div className="recipes-list">
			{
				recipes.slice(0,10).map((recipe, i) => {
					return (
						<RecipesListItem key={i} recipeInfo={recipe}></RecipesListItem>
					)
				})
			}
		</div>
		{showAdd && <buton className="add-recipe-button" onClick={addNewHandler}>Add new recipe</buton>}
	</>
	)

}

export default RecipesList;