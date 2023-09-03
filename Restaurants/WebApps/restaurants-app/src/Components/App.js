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
import { getRecipes } from "../api/Service";

const App = () => {
    const [isBasketSidebarOpen, setIsBasketSidebarOpen] = useState(false);
    const [searchState, setSearchState] = useState({
        searched: '',
        restaurant: false,
        category:'',
    });



    return (
        <>
            <Router>

                <div className="App">
                        <Header setSearchStateApp={setSearchState} setIsBasketOpen={setIsBasketSidebarOpen} />
                        <BasketSidebar
                            isOpen={isBasketSidebarOpen}
                            setIsOpen={setIsBasketSidebarOpen}
                        />
                        <Routes>
                            <Route exact path='/login-register' element={<LoginRegistrationModal />}></Route>
                        </Routes>
                </div>

            </Router>
        
        
            
    </>
  );
};

export default App;
