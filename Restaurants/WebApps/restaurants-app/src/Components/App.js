import BasketSidebar from "../modals/BasketSidebar";
import "./App.css";
import Header from "./Header/Header";
import RecipesList from "./RecipesList/RecipesList";
import EditRestaurantModal from "../modals/EditRestaurantModal";
import RestaurantsList from "./RestaurantsList/RestaurantsList"
import React, { useState } from "react";
import LoginRegistrationModal from "../modals/LoginRegistrationModal";
import AddToBasketModal from "../modals/AddToBasketModal";
import { BrowserRouter as Router, Switch, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from "../Components/pages/WelcomePage/WelcomePage";

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
                <Header className="appHeader" setSearchStateApp={setSearchState} setIsBasketOpen={setIsBasketSidebarOpen} />
                <div className="App">
                    <div>Restaurants</div>
                </div>
                <Routes>
                    <Route exact path='/' element={<WelcomePage />}></Route>
                    <Route exact path='/login-register' element={<LoginRegistrationModal />}></Route>
                </Routes>
            </Router>
            
      
      
            {/*  <div className="App-overlay" />
            { <BasketSidebar
        isOpen={isBasketSidebarOpen}
        setIsOpen={setIsBasketSidebarOpen}
            />}
            */}
            
    </>
  );
};

export default App;
