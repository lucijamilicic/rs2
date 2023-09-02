import "./App.css";
import Header from "./Header/Header";
import RecipesList from "./RecipesList/RecipesList";

const App = () => {
  return (
    <>
      <Header className="appHeader" />
      <div className="App">
        <div>Restaurants</div>
      </div>
          <div className="App-overlay" >
              <RecipesList></RecipesList>
          </div>
    </>
  );
};

export default App;
