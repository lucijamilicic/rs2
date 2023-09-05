import React, {useEffect, useState} from "react";
import "./AddRecipe.css"
import {ReactComponent as CancelImg} from "../../assets/cancel-icon.svg"
import { useNavigate } from 'react-router-dom'
import { addNewRecipe, getCategories } from "../../api/Service";
import { MultiSelect } from "react-multi-select-component";


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
            measure: ''
        });

    const [ingredientList, setIngredientList] = useState([]);

    const navigate = useNavigate();

    const submitHandler = async () => {
        await addNewRecipe({ ...state, listOfIngredients: ingredientList, category: selectedCategory[0].value });
        navigate('/');
    };

    const addIngredient = () => {
        setIngredientList([...ingredientList, ingredients]);
        setIngredients({
            name: '',
            measure: ''
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

    const handleChange = (e) => {
        setState({ ...state, category: e.target.value });
    };

    const cancelHandler = () => {
        navigate('/');
    };

    const [allCategories, setAllCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])

    useEffect(() => {
        const getAllCategories = async () => {
            const categories = await getCategories();
            setAllCategories(categories.data.map((category) => ({ label: category, value: category })));
        }

        getAllCategories();
    }, [])

    
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
              <div>
                  <MultiSelect
                      labelledBy="Select"
                      options={allCategories}
                      value={selectedCategory}
                      disableSearch={true}
                      hasSelectAll={false}
                      onChange={(e) => {
                          setSelectedCategory(e);
                      }}

                  />
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
                      value={ingredients.measure}
                      name="measure"
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
                              <td>{ingr.measure}</td>
                          </tr>
                      );
                  })}
                  </tbody>
              </table>
          </div>
          <button type="submit" className="submit-button" onClick={submitHandler}>Submit</button>
          <button className="cancel-button" onClick={ cancelHandler}>Cancel</button>
      </div>
  );    
};

export default AddRecipe;
