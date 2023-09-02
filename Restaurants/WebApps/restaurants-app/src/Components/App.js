import "./App.css";
import Header from "./Header/Header";
import RecipesList from "./RecipesList/RecipesList";
import  EditRestaurantModal from "../modals/EditRestaurantModal";
import RestaurantsList from "./RestaurantsList/RestaurantsList"

const App = () => {
  return (
    <>
      <Header className="appHeader" />
      <div className="App">
        <div>Restaurants</div>
      </div>
      <div className="App-overlay" >
        <RecipesList></RecipesList>
          <div className="App-overlay">
          <RestaurantsList></RestaurantsList>
          </div>
	</div>
    </>
  );
};

export default App;
