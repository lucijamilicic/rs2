import { getRecipes, getRecipesByCategory } from "../../api/Service";
import RecipesListItem from "../RecipesListItem/RecipesListItem"
import React, { useEffect, useState } from 'react';
import "./RecipesList.css"

const RecipesList = ({ searchedRecipe, searchedCategory }) => {

	const [recipes, setRecipes] = useState([]);
	const [snowAdd, setShowAdd] = useState(false);

	const addNewHandler = () => {
		setShowAdd(true);
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
		<buton className="add-recipe-button" onCLick={addNewHandler}>Add new recipe</buton>
		 
	</>
	)

}

export default RecipesList;