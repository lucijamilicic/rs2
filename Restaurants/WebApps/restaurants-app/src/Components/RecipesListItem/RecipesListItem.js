import "./RecipesListItem.css"
import Image from "../../assets/background.jpg"

const RecipesListItem = ({ recipeInfo }) => {

    return (
        <div className="recipe-card">
            <div className="recipe-name"> {recipeInfo?.name} </div>
            <div className="recipe-image">
                <img src={Image} alt="alternative"></img>
            </div>
            <div className="recipe-ingredients">
                <ul>
                    {recipeInfo?.ingredients.map(ingredient => (
                        <li>{ ingredient}</li>
                    ))}
                </ul>
            </div>
           
        </div>
    )
}

export default RecipesListItem;