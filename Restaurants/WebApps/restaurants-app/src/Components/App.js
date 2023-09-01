import "./App.css";
import Header from "./Header/Header";
import RestaurantsList from "./RestaurantsList/RestaurantsList"

const App = () => {
  return (
    <>
      <Header className="appHeader" />
      <div className="App">
        <div>Restaurants</div>
      </div>
          <RestaurantsList></RestaurantsList>
          <div className="App-overlay" />
    </>
  );
};

export default App;
