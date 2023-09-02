import BasketSidebar from "../modals/BasketSidebar";
import "./App.css";
import Header from "./Header/Header";
import RecipesList from "./RecipesList/RecipesList";
import EditRestaurantModal from "../modals/EditRestaurantModal";
import RestaurantsList from "./RestaurantsList/RestaurantsList"
import React, { useState } from "react";
import LoginRegistrationModal from "../modals/LoginRegistrationModal";
import AddToBasketModal from "../modals/AddToBasketModal";
import { BrowserRouter as Router, Switch, Routes, Route, Link} from 'react-router-dom';


const App = () => {
    const [isBasketSidebarOpen, setIsBasketSidebarOpen] = useState(false);

    return (
        <>
            <Router>
                <Header className="appHeader" setIsBasketOpen={setIsBasketSidebarOpen} />
                <div className="App">
                    <div>Restaurants</div>
                </div>
                <Routes>
                    <Route exact path='/' element={<></> }></Route>
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
