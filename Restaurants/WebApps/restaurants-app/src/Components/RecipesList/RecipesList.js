import { getRecipes } from "../../api/Service";
import RecipesListItem from "../RecipesListItem/RecipesListItem"
import React, { useEffect, useState } from 'react';

const RecipesList = () => {


	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		const getAllRecipes = async () => {
			const recipes = await getRecipes().then(response => response.data).catch(error => []);
			setRecipes(recipes);
		}

		getAllRecipes();
	}, []);


	return (
		<div className="recipes-list">
			{
				recipes.slice(0,10).map((recipe, i) => {
					return (
						<RecipesListItem key={i} recipeInfo={recipe}></RecipesListItem>
					)
				})
			}
		</div>
	)

}

export default RecipesList;