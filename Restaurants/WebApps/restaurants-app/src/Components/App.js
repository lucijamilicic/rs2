import "./App.css";
import Header from "./Header/Header";

const App = () => {
  return (
    <>
      <Header className="appHeader" />
      <div className="App">
        <div>Restaurants</div>
      </div>
      <div className="App-overlay" />
    </>
  );
};

export default App;
