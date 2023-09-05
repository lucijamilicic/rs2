import BasketSidebar from "../modals/BasketSidebar";
import "./App.css";
import Header from "./Header/Header";
import React, { useState } from "react";
import LoginRegistrationModal from "../modals/LoginRegistrationModal";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from "../Components/pages/WelcomePage/WelcomePage";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
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
