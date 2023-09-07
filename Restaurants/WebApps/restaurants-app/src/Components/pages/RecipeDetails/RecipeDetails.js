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
                                   {recipe?.listOfIngredients.map((ingredient, i) => {
                                        return (
                                            <>
                                                {ingredient.measure} - {ingredient.name}
                                                <>
                                                    {i !== (recipe?.listOfIngredients.length - 1) && 
                                                      <>, { " "}</> 
                                                    }
                                                </>
                                                
                                            </>
                                        )
                                   })}
                              </div>
                                </div>
                                <div className="third-column">
                                    {recipe?.restaurants.length > 0 &&
                                        <div >
                                            <h3 className="available">Available in:</h3>
                                            {recipe?.restaurants.map((restaurant) => {
                                                return (
                                                    <div className="available-restaurant">
                                                        <div className="restaurant-name"> {restaurant.restaurantName}</div>
                                                        <div className="restaurant-address">{restaurant.address}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                    <a href={recipe?.tutorialVideoUrl} target="_blank" className="tutorial">Watch full tutorial on YouTube</a>
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