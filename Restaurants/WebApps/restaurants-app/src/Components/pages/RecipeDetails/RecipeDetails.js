import "./RecipeDetails.css"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getRecipesById } from "../../../api/Service"


const RecipeDetails = () => {

    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const isUserLogged = localStorage.getItem("accessToken");


    useEffect(() => {

        const getRecipesDetailsById = async () => {
            const response = await getRecipesById(id).then(response => response.data).catch(error => null);
            setRecipe(response);
        }

        getRecipesDetailsById();

    }, []);


    return (
        <div className="recipe-details">
            <h1>{recipe?.name}</h1>
            <div className="container">

                <div className="recipe-img">

                    <img src={recipe?.imageUrl} alt="img"></img>

                </div>

                <div className="ingredients">
                <h3>Ingredients: </h3>
                { recipe?.listOfIngredients.map((ingredient) => {
                    return (
                        <>
                            <div> {ingredient.measure} {ingredient.name}</div>
                        </>
                    )
                })}

                </div>
                {recipe?.restaurants.length > 0 ?  <div>
                    <h3>Available in:</h3>
                    {recipe?.restaurants.map((restaurant) => {
                        return (
                            <>
                                <div> {restaurant.restaurantName} {restaurant.address}</div>
                            </>
                        )
                    })}
                </div> : <></>}
            </div>
            <br></br>
            <p>{recipe?.recipe}</p>
            <a href={recipe?.tutorialVideoUrl} target="_blank">Watch full tutorial on YouTube</a>

        </div>
    )
}

export default RecipeDetails;