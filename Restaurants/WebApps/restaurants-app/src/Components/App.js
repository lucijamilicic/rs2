import BasketSidebar from "../modals/BasketSidebar";
import "./App.css";
import Header from "./Header/Header";
import RecipesList from "./RecipesList/RecipesList";
import EditRestaurantModal from "../modals/EditRestaurantModal";
import RestaurantsList from "./RestaurantsList/RestaurantsList"
import React, { useEffect, useState } from "react";
import LoginRegistrationModal from "../modals/LoginRegistrationModal";
import AddToBasketModal from "../modals/AddToBasketModal";
import { BrowserRouter as Router, Switch, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from "../Components/pages/WelcomePage/WelcomePage";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import { getRecipes } from "../api/Service";
import AddRecipe from "./AddRecipes/AddRecipe";

const App = () => {
    const [state, setState] = useState({
        searched: '',
        isRestaurant: true,
        category:'',
    });
    const [isBasketSidebarOpen, setIsBasketSidebarOpen] = useState(false);


    return (
        <>
            <Router>

                <div className="App">
                    <Header state={state} setState={setState} setIsBasketOpen={setIsBasketSidebarOpen} />
                        <BasketSidebar
                            isOpen={isBasketSidebarOpen}
                            setIsOpen={setIsBasketSidebarOpen}
                        />
			            <Routes>
                    		<Route exact path='/' element={<WelcomePage state={state} />}></Route>
                    		<Route exact path='/login-register' element={<LoginRegistrationModal />}></Route>
                        <Route exact path='/details/:id' element={<RecipeDetails />}></Route>
                        <Route exact path='/addRecipe' element={<AddRecipe />}></Route>
                	    </Routes>
                </div>
            </Router>
        
        
            
    </>
  );
};

export default App;
