import React, { useState } from "react";
import "./Header.css";
import { ReactComponent as BasketIcon } from "../../assets/basket.svg";
import { logout } from "../../api/Service"
import { useNavigate } from "react-router-dom";



const Header = ({ state, setState, setIsBasketOpen }) => {

  const [showCategories, setShowCategories] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [categories, setCategories] = useState([
    "Pork",
    "Chicken",
    "Pasta"
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
            setState({
                ...state,
                searched: searchState,
            });
            navigate('/');
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
                          !state.isRestaurant ? "Search recipes" : "Search restaurants"
                      }
                      onChange={textInputHandler}
                      onKeyPress={(e) => handleKeyPress(e) }
          />
          <button
            type="button"
            className={`switch-button ${ state.isRestaurant
               ? "active" : "disabled"
            }`}
            onClick={() => {
                if (!state.isRestaurant) {
                    setState({
                        ...state,
                        isRestaurant: true,
                    });
                setShowCategories(false);
                }
            }}
          >
            Restaurants
          </button>
          <button
            type="button"
                      className={`switch-button ${!state.isRestaurant ? "active" : "disabled"}`}
            onClick={() => {
                if (state.isRestaurant) {
                    setState({
                        ...state,
                        isRestaurant: false,
                    })
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
                      navigate('/');
                      setState({
                          ...state,
                          isRestaurant: false,
                          category: category,
                      })
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
