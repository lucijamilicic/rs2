import { getRecipes, getRecipesByCategory, getRecipesByName } from "../../api/Service";
import RecipesListItem from "../RecipesListItem/RecipesListItem"
import React, { useEffect, useState } from 'react';
import "./RecipesList.css"
import { useNavigate } from 'react-router-dom'; 
import { getRole } from "../../common/helpers";
import { PulseLoader } from 'react-spinners';


const RecipesList = ({ searchedRecipe, searchedCategory }) => {

	const [recipes, setRecipes] = useState([]);
	const [showAdd, setShowAdd] = useState(false);
	const [showLoader, setShowLoader] = useState(true);

	const navigate = useNavigate();
	const role = getRole();

	useEffect(() => {
		if (role === "Administrator") {
			setShowAdd(true);
		}

	}, []);

	const addNewHandler = () => {
		navigate('/add-recipe');
	};

	useEffect(() => {

		const getAllRecipes = async () => {
			setShowLoader(true);
			const recipes = await getRecipes().then(response => {
				setShowLoader(false);
				return response.data;
			});
			setRecipes(recipes);
		};

		const getRecipesByName = async () => {
			const recipes = await getRecipesByName(searchedRecipe);
			setRecipes(recipes.data);
		};
		
		getAllRecipes();
	}, []);

	useEffect(() => {

		const getAllRecipesInCategory = async () => {
			const recipes = await getRecipesByCategory(searchedCategory);
			setRecipes(recipes.data);
		}

		searchedCategory && getAllRecipesInCategory();

	}, [searchedCategory])

	useEffect(() => {

		const getRecipeByName = async () => {
			const recipes = await getRecipesByName(searchedRecipe);
			setRecipes(recipes.data);
		}

		searchedRecipe && getRecipeByName();

	}, [searchedRecipe])


	return (
		<>
			{
				showLoader ? (
					<div className="page-loader-overlay">
						<PulseLoader className="loader" />
					</div>
				) : (
					<>
					{
						recipes?.length === 0 ? (
						<div className="message-wrap">There are no results for this search.</div>
					) : (
							<div className="recipes-list">
								{
									recipes?.map((recipe, i) => {
										return (
											<RecipesListItem key={i} recipeInfo={recipe}></RecipesListItem>
										)
									})
								}
							</div>
						)
							}
					</>
				)
			}
			{showAdd && <buton className="add-recipe-button" onClick={addNewHandler}>Add new recipe</buton>}
		</>
	)

}

export default RecipesList;