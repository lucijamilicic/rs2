import BasketSidebar from "../modals/BasketSidebar";
import "./App.css";
import Header from "./Header/Header";
import React, { useRef, useState } from "react";
import LoginRegistrationModal from "../modals/LoginRegistrationModal";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from "../Components/pages/WelcomePage/WelcomePage";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import AddRecipe from "./AddRecipes/AddRecipe";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { Navigate } from 'react-router-dom';
import ForbiddenRoute from "./Routes/ForbiddenRoute";
import { getRefreshToken, getUsername, refreshToken } from "../common/helpers";

const App = () => {

    const [state, setState] = useState({
        searched: '',
        isRestaurant: true,
        category:'',
    });

    const basketRef = useRef();

    const [isBasketSidebarOpen, setIsBasketSidebarOpen] = useState(false);

    return (
        <>
            <Router>
                <div className="App">
                    <div>
                            <BasketSidebar
                                isOpen={isBasketSidebarOpen}
                                setIsOpen={setIsBasketSidebarOpen}
                            />
                        </div>
                        <Routes>
                            <Route
                                exact
                                path='/login-register'
                                element={
                                    <LoginRegistrationModal />
                                }
                            />
                            <Route
                                exact
                                path='/'
                                element={
                                    <ProtectedRoute>
                                        <Header state={state} setState={setState} setIsBasketOpen={setIsBasketSidebarOpen} />
                                        <WelcomePage state={state} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                exact
                                path='/details/:id'
                                element={
                                    <ProtectedRoute>
                                        <Header state={state} setState={setState} setIsBasketOpen={setIsBasketSidebarOpen} />
                                        <RecipeDetails />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                exact
                                path='/add-recipe'
                                element={
                                    <ProtectedRoute>
                                        <ForbiddenRoute>
                                            <Header state={state} setState={setState} setIsBasketOpen={setIsBasketSidebarOpen} />
                                            <AddRecipe />
                                        </ForbiddenRoute>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                exact
                                path="*"
                                element={
                                    <Navigate to="/" />
                                }
                            />
                	    </Routes>
                </div>
            </Router>
        
        
            
    </>
  );
};

export default App;
