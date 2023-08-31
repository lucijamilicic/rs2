import React, { useState } from "react";
import "./Header.css";
import { ReactComponent as BasketIcon } from "../../assets/basket.svg";

const Header = () => {
  const [searchRecipes, setSearchRecipes] = useState(false);
  const [searchRestaurants, setSearchRestaurants] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [categories, setCategories] = useState([
    "Pork",
    "Chicken",
    "Pasta",
    "Pizza",
    "Salad",
  ]);

  const textInputHandler = (e) => {
    setSearchState(e.target.value);
  };

  return (
    <div className="header">
      <div className="header-left">
        <div className="search-wrap">
          <input
            type="text"
            name="restaurants-recipes"
            value={searchState}
            placeholder={
              searchRecipes ? "Search recipes" : "Search restaurants"
            }
            onChange={textInputHandler}
          />
          <button
            type="button"
            className={`switch-button ${
              searchRestaurants ? "active" : "disabled"
            }`}
            onClick={() => {
              if (!searchRestaurants) {
                setSearchRestaurants(!searchRestaurants);
                setSearchRecipes(!searchRecipes);
                setShowCategories(false);
              }
            }}
          >
            Restaurants
          </button>
          <button
            type="button"
            className={`switch-button ${searchRecipes ? "active" : "disabled"}`}
            onClick={() => {
              if (!searchRecipes) {
                setSearchRecipes(!searchRecipes);
                setSearchRestaurants(!searchRestaurants);
                setShowCategories(true);
              }
            }}
          >
            Recipes
          </button>
        </div>
      </div>
      <div className="header-right">
        <BasketIcon />
        <button type="button" className="logout-button">
          Logout
        </button>
      </div>
      <div
        className={`categories-container ${
          showCategories ? "visible" : "hidden"
        }`}
      >
        {categories.map((category) => {
          return (
            <div
              className="category-item"
              onClick={() => {
                //todo
              }}
            >
              {category}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
