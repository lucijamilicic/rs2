import React, { useState } from "react";
import "./Header.css";
import { ReactComponent as BasketIcon } from "../../assets/basket.svg";
import { logout } from "../../api/Service"
import { useNavigate } from "react-router-dom";



const Header = ({ setSearchStateApp, setIsBasketOpen }) => {
  const [searchRecipes, setSearchRecipes] = useState(false);
  const [searchRestaurants, setSearchRestaurants] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([
    "Pork",
    "Chicken",
    "Pasta",
    "Pizza",
    "Salad",
  ]);
  const [userState, setUserState] = useState({
    "userName": "",
    "refreshToken": ""
  });

    const navigate = useNavigate();

    const textInputHandler = (e) => {
        setSearchState(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearchStateApp({
                searched: searchState,
                restaurant: searchRestaurants,
                category: selectedCategory
            });
            setSearchState('');
        }
    }

    const logoutUser = async () => {
        const token = localStorage.getItem("refreshToken");
        const accessToken = localStorage.getItem("accessToken");

        if (token) {
            setUserState({
                userName: localStorage.getItem("userName"),
                refreshToken: localStorage.getItem("refreshToken")
            });

            await logout({
                userName: localStorage.getItem("userName"),
                refreshToken: localStorage.getItem("refreshToken")

            }, accessToken);
            localStorage.clear();
            setUserState({
                userName: "",
                refreshToken: ""
            });
            navigate('/login-register');

        }
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
                      onKeyPress={(e) => handleKeyPress(e) }
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
              {
                  localStorage.getItem("refreshToken") && (
                      <>
                      <BasketIcon
                          onClick={() => {
                            setIsBasketOpen((isBasketOpen) => !isBasketOpen);
                          }}
                              />
                          <button type="button" className="logout-button" onClick={() => {
                              logoutUser();
                              }}>
                          Logout
                          </button>
                      </>
                  )
              }
        
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
                  onClick={(e) => {
                      setSelectedCategory(e.target.value);
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
