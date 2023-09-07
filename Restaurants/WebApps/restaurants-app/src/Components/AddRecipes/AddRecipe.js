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
        if (isValid()) {
            await addNewRecipe({ ...state, listOfIngredients: ingredientList, category: selectedCategory[0].value });
            navigate('/');
        }
            console.log(validationErr);
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

    const [validationErr, setValidationErr] = useState({
        nameErr: "",
        recipeErr: "",
        ingredientErr: "",
        categoryErr: ""
    });

    const isValid = () => {
        let valid = true;
        const errors = {
            nameErr: "",
            recipeErr: "",
            ingredientErr: "",
            categoryErr: ""
        }
        if (state.name === '') {
            errors.nameErr = 'Name is required';
            valid = false;
        }
        else {
            errors.nameErr = '';
        }
        if (state.recipe === '') {
            errors.recipeErr = 'Recipe is required';
            valid = false;
        }
        else {
            errors.recipeErr = '';
        }
        if (ingredientList.length <= 0) {
            errors.ingredientErr = 'At least one ingredient is required';
            valid = false;
        }
        else {
            errors.ingredientErr = '';
        }
        if (selectedCategory.length <= 0) {
            errors.categoryErr = 'Category is required';
            valid = false;
        }
        else {
            errors.categoryErr = '';
        }

        setValidationErr(errors);
        return valid;

    }
    
  return (
      <div className="formular">
          <div className="left">
              <div className="input-wrap">
                  <label>Name of dish: </label>
                  <span>{validationErr.nameErr}</span>
                  <input
                      placeholder="Dish name"
                      value={state.name}
                      name="name"
                      type="text"
                      onChange={textInputHandler}
                  />
              </div>
              <div className="input-wrap">
                  <label>Category: </label>
                  <span>{validationErr.categoryErr}</span>
                  <div>
                      <MultiSelect
                          
                          labelledBy="Select"
                          options={allCategories}
                          value={selectedCategory}
                          disableSearch={false}
                          hasSelectAll={false}
                          onChange={(e) => {
                              setSelectedCategory(e);
                          }}

                      />
                  </div>
              </div>
              <div className="input-wrap">
                  <label className="add-label">Recipe: </label>
                  <span>{validationErr.recipeErr}</span>
                  <textarea
                      placeholder="Recipe"
                      value={state.recipe}
                      name="recipe"
                      type="text"
                      onChange={textInputHandler}
                  />
              </div>
              <div className="input-wrap">
                  <label>Image url: </label>
                  <input
                      placeholder="Image of the dish"
                      value={state.imageUrl}
                      name="imageUrl"
                      type="text"
                      onChange={textInputHandler}
                  />
              </div>
              <div className="input-wrap">
                  <label>Tutorial video url: </label>
                  <input
                      placeholder="Tutorial video"
                      value={state.tutorialVideoUrl}
                      name="tutorialVideoUrl"
                      type="text"
                      onChange={textInputHandler}
                  />
              </div>
          </div>
          <div className="right">
              <div className="ingredients-container">
                  <h4>List of ingredients: </h4>
                  <span>{validationErr.ingredientErr}</span>
                  <div className="ingredient-inputs">
                    <div className="input-wrap">
                      <label className="add-label"> Ingredient name: </label>
                      <input
                          placeholder="Enter name"
                          value={ingredients.name}
                          name="name"
                          type="text"
                          onChange={ingredientsInputHandler}
                      />
                    </div>
                    <div className="input-wrap">
                      <label className="add-label"> Measure: </label>
                      <input
                          placeholder="Enter measure"
                          value={ingredients.measure}
                          name="measure"
                          type="text"
                          onChange={ingredientsInputHandler}
                      />
                      </div>
                      <button className="add-ingred-button" onClick={addIngredient}>+</button>
                  </div>
                  {
                      ingredientList.length !== 0 &&
                      <div>
                          <table className="add-table">
                              <thead>
                                  <tr>
                                      <th className="table-head">Ingredient</th>
                                      <th className="table-head">Measurements</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {ingredientList?.map((ingr, i) => {
                                      return (
                                          <tr>
                                              <td>{ingr.name}</td>
                                              <td>{ingr.measure}</td>
                                              <td><button onClick={() => (
                                                   setIngredientList(prevList => {
                                                       const newList = prevList.filter((_, j) => j !== i);
                                                       return newList;
                                                  })
                                              )}>
                                                  x
                                              </button></td>
                                          </tr>
                                      );
                                  })}
                              </tbody>
                          </table>
                      </div>
                  }
              </div>
              
             
              <div className="buttons-wrap">
                  <button className="clear" onClick={cancelHandler}>Cancel</button>
                  <button type="submit" className="checkout-button" onClick={submitHandler}>Create</button>
              </div> 
          </div>
          
       </div>
  );    
};

export default AddRecipe;
