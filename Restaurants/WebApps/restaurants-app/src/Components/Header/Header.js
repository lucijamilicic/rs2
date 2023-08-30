import React, { useState } from "react";
import "./Header.css";
import { ReactComponent as BasketIcon } from "../../assets/basket.svg";

const Header = () => {
  const [searchRecipes, setSearchRecipes] = useState(false);
  const [searchRestaurants, setSearchRestaurants] = useState(true);
  const [searchState, setSearchState] = useState("");

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
              setSearchRestaurants(!searchRestaurants);
              setSearchRecipes(!searchRecipes);
            }}
          >
            Restaurants
          </button>
          <button
            type="button"
            className={`switch-button ${searchRecipes ? "active" : "disabled"}`}
            onClick={() => {
              setSearchRecipes(!searchRecipes);
              setSearchRestaurants(!searchRestaurants);
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
    </div>
  );
};

export default Header;
