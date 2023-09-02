import "./RecipeDetails.css"

const RecipeDetails = () => {

    const recipe = {
        "Id": "52907",
        "Name": "Duck Confit",
        "Category": "Miscellaneous",
        "Recipe": "The day before you want to make the dish, scatter half the salt, half the garlic and half of the herbs over the base of a small shallow dish. Lay the duck legs, skin-side up, on top, then scatter over the remaining salt, garlic and herbs. Cover the duck and refrigerate overnight. This can be done up to 2 days ahead.\r\nPour the wine into a saucepan that will snugly fit the duck legs in a single layer. Brush the salt off the duck legs and place them, skin-side down, in the wine. Cover the pan with a lid and place over a medium heat. As soon as the wine starts to bubble, turn the heat down to the lowest setting and cook for 2 hours, checking occasionally that the liquid is just barely simmering. (If you own a heat diffuser, it would be good to use it here.) After 2 hours, the duck legs should be submerged in their own fat and the meat should feel incredibly tender when prodded. Leave to cool.\r\nThe duck legs are now cooked and can be eaten immediately \u2013 or you can follow the next step if you like them crisp. If you are preparing ahead, pack the duck legs tightly into a plastic container or jar and pour over the fat, but not the liquid at the bottom of the pan. Cover and leave in the fridge for up to a month, or freeze for up to 3 months. The liquid you are left with makes a tasty gravy, which can be chilled or frozen until needed.\r\nTo reheat and crisp up the duck legs, heat oven to 220C/fan 200C/gas 7. Remove the legs from the fat and place them, skin-side down, in an ovenproof frying pan. Roast for 30-40 mins, turning halfway through, until brown and crisp. Serve with the reheated gravy, a crisp salad and some crisp golden ptoatoes.",
        "ImageUrl": "https://www.themealdb.com/images/media/meals/wvpvsu1511786158.jpg",
        "TutorialVideoUrl": "https://www.youtube.com/watch?v=MHhLJqghY-o",
        "ListOfIngredients": [
            {
                "name": "Sea Salt",
                "measure": "Handful"
            },
            {
                "name": "Bay Leaf",
                "measure": "4"
            },
            {
                "name": "Garlic",
                "measure": "4 cloves"
            },
            {
                "name": "Thyme",
                "measure": "Handful"
            },
            {
                "name": "Duck Legs",
                "measure": "4"
            },
            {
                "name": "White Wine",
                "measure": "100ml"
            }
        ],
        "restaurants": [
            {
                "name": "Restoran1",
                "address": "Adresa 11"
            },
            {
                "name": "Restoran2",
                "address": "Adresa 22"
            },
            {
                "name": "Restoran3",
                "address": "Adresa 33"
            }
        ]
    };

    return (
        <div className="recipe-details">
            <h1>{recipe.Name}</h1>
            <div className="container">

                <div className="recipe-img">

                    <img src={recipe.ImageUrl}></img>

                </div>

                <div className="ingredients">
                <h3>Ingredients: </h3>
                {recipe.ListOfIngredients.map((ingredient) => {
                    return (
                        <>
                            <div> {ingredient.measure} {ingredient.name}</div>
                        </>
                    )
                })}

                </div>
                <div>
                    <h3>Available in:</h3>
                    {recipe.restaurants.map((restaurant) => {
                        return (
                            <>
                                <div> {restaurant.name} {restaurant.address}</div>
                            </>
                        )
                    })}
                </div>
            </div>
            <br></br>
            <p>{recipe.Recipe}</p>
            <a href={recipe.TutorialVideoUrl}>Watch full tutorial on YouTube</a>

        </div>
    )
}

export default RecipeDetails;