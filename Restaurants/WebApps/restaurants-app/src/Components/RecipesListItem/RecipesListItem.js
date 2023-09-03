import "./RecipesListItem.css"
import Image from "../../assets/background.jpg"

const RecipesListItem = ({ recipeInfo }) => {


    const listOfIngredients = (recipeInfo?.listOfIngredients.map((ingredient) => ingredient.name)).toString().toLowerCase();
   
   


    return (
        <div className="recipe-card">
            <div className="recipe-image">
                <img src={recipeInfo?.imageUrl} alt="alternative"></img>
            </div>
            <div className="recipe-content">
                <div className="recipe-name"> {recipeInfo?.name} </div>
                <div className="recipe-ingredients">
                    {listOfIngredients}
                </div>
                <a className="see-more-button">See more...</a>
            </div>
           
        </div>
    )
}

export default RecipesListItem;