import React, {useState} from "react";
import "./AddRecipe.css"
import {ReactComponent as CancelImg} from "../../assets/cancel-icon.svg"
import { useNavigate } from 'react-router-dom'


const  AddRecipe = () => {
    const [state, setState] = useState({
        name: '',
        category: '',
        recipe: '',
        imageUrl: '',
        tutorialVideoUrl: ''
    });
    const [ingredients, setIngredients] = useState(
        {
            name: '',
            measurements: ''
        });

    const [ingredientList, setIngredientList] = useState([]);

    const navigate = useNavigate();

    const submitHandler = () => {
        //TODO:
        //redirect na recipes, maybe
        navigate('/');

    };

    const addIngredient = () => {
        setIngredientList([...ingredientList, ingredients]);
        setIngredients({
            name: '',
            measurements: ''
        });
    };

    const textInputHandler = (e) => {
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
    };
    const ingredientsInputHandler = (e) => {
        const { name, value } = e.target;

        setIngredients({ ...ingredients, [name]: value });
    };

    
  return (
      <div className="formular">
          <p className="add-title">Add new recipe</p>
          <div className="add-item">
              <p className="add-label">Name of dish: </p>
              <input
                  className="add-input"
                  placeholder="Dish name"
                  value={state.name}
                  name="name"
                  type="text"
                  onChange={textInputHandler}
              />
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
              <textarea
                  className="add-textarea"
                  placeholder="Recipe"
                  value={state.recipe}
                  name="recipe"
                  type="text"
                  onChange={textInputHandler}
              />
          </div>
          <div className="add-item">
              <p className="add-label">Image url: </p>
              <input
                  className="add-input"
                  placeholder="Image of the dish"
                  value={state.imageUrl}
                  name="imageUrl"
                  type="text"
                  onChange={textInputHandler}
              />
          </div>
          <div className="add-item">
              <p className="add-label">Tutorial video url: </p>
              <input
                  className="add-input"
                  placeholder="Tutorial video"
                  value={state.tutorialVideoUrl}
                  name="tutorialVideoUrl"
                  type="text"
                  onChange={textInputHandler}
              />
          </div>
          <div className="add-item">
              <p className="add-label">List of ingredients: </p>
              <div className="add-ingredient">
                  <p className="add-ingredient-label"> Ingredient: </p>
                  <input
                      className="add-ingredient-input"
                      placeholder="ingredient name"
                      value={ingredients.name}
                      name="name"
                      type="text"
                      onChange={ingredientsInputHandler}
                  />
              </div>
              <div className="add-ingredient">
                  <p className="add-ingredient-label"> Measurements: </p>
                  <input
                      className="add-ingredient-input"
                      placeholder="measurements"
                      value={ingredients.measurements}
                      name="measurements"
                      type="text"
                      onChange={ingredientsInputHandler}
                  />
              </div>
              <button className="add-ingred-button" onClick={addIngredient}>+</button>
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
                      {ingredientList?.map(ingr=>{
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
          <button type="submit" className="submit-button" onClick={submitHandler}>Submit</button>
      </div>
  );    
};

export default AddRecipe;
