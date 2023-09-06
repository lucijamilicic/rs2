import "./RecipeDetails.css"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getRecipesById } from "../../../api/Service"
import { PulseLoader } from 'react-spinners';


const RecipeDetails = () => {

    const { id } = useParams();
    const [ recipe, setRecipe ] = useState(null);
    const [ showLoader, setShowLoader ] = useState(false);


    useEffect(() => {

        const getRecipesDetailsById = async () => {
            setShowLoader(true);
            const response = await getRecipesById(id).then(response => {
                setShowLoader(false);
                return response.data;
            }).catch(error => {
                setShowLoader(false);
                return null;
            });
            setRecipe(response);
        }

        getRecipesDetailsById();

    }, []);


    return (
        <>
        {
            showLoader ? (
                <div className="page-loader-overlay">
                    <PulseLoader className="loader" />
                </div>
            ) : (
                <div className="recipe-details">
                    <div className="container">
                        <div className="recipe-img">
                            <img src={recipe?.imageUrl} alt="img"></img>
                        </div>
                        <div className="second-column">
                             <h1>{recipe?.name}</h1>
                             <div className="ingredients">
                                  <h3>Ingredients: </h3>
                                   {recipe?.listOfIngredients.map((ingredient) => {
                                        return (
                                           <>
                                              <div> {ingredient.measure} - {ingredient.name}</div>
                                            </>
                                        )
                                   })}
                              </div>
                                </div>
                                <div className="third-column">
                              <a href={recipe?.tutorialVideoUrl} target="_blank">Watch full tutorial on YouTube</a>
                                    {recipe?.restaurants.length > 0 &&
                                        <div>
                                            <h3>Available in:</h3>
                                            {recipe?.restaurants.map((restaurant) => {
                                                return (
                                                    <>
                                                        <div> {restaurant.restaurantName} {restaurant.address}</div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    }
                          </div>
                          </div>
                            <p className="recipe-paragraph">{recipe?.recipe}</p>
                         </div>
                )
            }
        </>
    )
}

export default RecipeDetails;