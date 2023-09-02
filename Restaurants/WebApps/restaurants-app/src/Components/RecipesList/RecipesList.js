import RecipesListItem from "../RecipesListItem/RecipesListItem"


const RecipesList = () => {

	const recipes = [
		{
			"name": "Lamb with vegetables",
			"image": "...",
			"ingredients":["onion", "tomatoes", "spaghetti", "carrots", "lamb"]
		},
		{
			"name": "Lamb with vegetables",
			"image": "...",
			"ingredients": ["onion", "tomatoes", "spaghetti", "carrots", "lamb"]
		},
		{
			"name": "Lamb with vegetables",
			"image": "...",
			"ingredients": ["onion", "tomatoes", "spaghetti", "carrots", "lamb"]
		}
	]



	return (
		<>
			{
				recipes.map((recipe) => {
					return (
						<RecipesListItem recipeInfo={recipe}></RecipesListItem>
					)
				})

			}
		</>
	)

}

export default RecipesList;