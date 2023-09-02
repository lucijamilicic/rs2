import React, {useState} from "react";
import "./AddRecipe.css"
import {ReactComponent as CancelImg} from "../../assets/cancel-icon.svg"


const  AddRecipe = () => {
    const [state, setState] = useState({
        name: '',
        category: '',
        recipe: '',
        imageUrl: '',
        tutorialVideoUrl: ''
    });
    const [ingredients, setIngredients] = useState([
        {name:'mleko', measurements:'1l'},
        {name:'mleko', measurements:'1l'},
        {name:'mleko', measurements:'1l'}
    ]);
    
  return (
      <div className="formular">
          <p className="add-title">Add new recipe</p>
          <div className="add-item">
              <p className="add-label">Name of dish: </p>
              <input className="add-input" placeholder="Dish name" />
          </div>
          <div className="add-item">
              <p className="add-label">Category: </p>
              <div className="add-radio">
                  <input className="radio-button" type="radio" value="Pasta" name="category" /> Pasta
                  <input className="radio-button" type="radio" value="Pork" name="category" /> Pork
                  <input className="radio-button" type="radio" value="Vegeterian" name="category" /> Vegeterian
                  <input className="radio-button" type="radio" value="Beef" name="category" /> Beef
                  <input className="radio-button" type="radio" value="Chicken" name="category" /> Chicken
              </div>
          </div>
          <div className="add-item">
              <p className="add-label">Recipe: </p>
              <textarea className="add-textarea" placeholder="Recipe" />
          </div>
          <div className="add-item">
              <p className="add-label">Image url: </p>
              <input className="add-input" placeholder="Image of the dish" />
          </div>
          <div className="add-item">
              <p className="add-label">Tutorial video url: </p>
              <input className="add-input" placeholder="Tutorial video" />
          </div>
          <div className="add-item">
              <p className="add-label">List of ingredients: </p>
              <div className="add-ingredient">
                  <p className="add-ingredient-label"> Ingredient: </p>
                  <input className="add-ingredient-input" placeholder="ingredient name" />
              </div>
              <div className="add-ingredient">
                  <p className="add-ingredient-label"> Measurements: </p>
                  <input className="add-ingredient-input" placeholder="measurements" />
              </div>
               <button className="add-ingred-button">+</button>
          </div>
          <div className="add-item">
              <table className="add-table">
                  <thead>
                      <tr>
                          <td className="table-head">Ingredient</td>
                          <td className="table-head">Measurements</td>
                      </tr>
                  </thead>
                  <tbody>
                  {ingredients.map(ingr=>{
                      return(
                          <tr>
                              <td>{ingr.name}</td>
                              <td>{ingr.measurements}</td>
                          </tr>
                      );
                  })}
                  </tbody>
              </table>
          </div>
      </div>
  );    
};

export default AddRecipe;
