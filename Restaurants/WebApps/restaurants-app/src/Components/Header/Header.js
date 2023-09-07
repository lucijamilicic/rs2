import React, { useEffect, useState } from "react";
import "./Header.css";
import { ReactComponent as BasketIcon } from "../../assets/basket.svg";
import { getCategories, logout } from "../../api/Service"
import { useNavigate } from "react-router-dom";
import { getRole } from "../../common/helpers";



const Header = ({ state, setState, setIsBasketOpen }) => {

    const role = getRole();
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    const [showCategories, setShowCategories] = useState(false);
    const [searchState, setSearchState] = useState("");
    const [categories, setCategories] = useState([]);
    const [userState, setUserState] = useState({
        "userName": "",
        "refreshToken": ""
    });

    useEffect(() => {

        const getAllCategories = async () => {
            const cc = await getCategories();
            setCategories(cc.data);
        }

        getAllCategories();

    }, []);

    useEffect(() => {

        if (!state.isRestaurant) {
            setShowCategories(true);
        } else {
            setShowCategories(false);
        }

    }, [state]);
        

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
        
        if (refreshToken) {
            setUserState({
                refreshToken,
                userName: localStorage.getItem("userName"),
            });

            await logout({
                refreshToken,
                userName: localStorage.getItem("userName"),

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
                     onKeyPress={(e) => handleKeyPress(e)}
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
                                searched: '',
                                isRestaurant: true,
                                category: ''
                            });
                            setShowCategories(false);
                            navigate('/');
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
                                searched: '',
                                isRestaurant: false,
                            })
                            setShowCategories(true);
                            navigate('/');
                      }
                
                    }}
                  >
                    Recipes
                  </button>
                </div>
              </div>
                  <div className="header-right">
                      { 
                          <>
                              {
                                  role !== 'Administrator' && 
                                  <BasketIcon
                                      onClick={() => {
                                          setIsBasketOpen((isBasketOpen) => !isBasketOpen);
                                      }}
                                  />
                              }
                              <button type="button" className="logout-button" onClick={() => logoutUser()}>
                                  Logout
                              </button>
                          </>
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
                            className={`category-item ${state.category === category && 'selected'}`}
                          onClick={(e) => {
                              setState({
                                  ...state,
                                  isRestaurant: false,
                                  category: category,
                              })
                              navigate('/');
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
