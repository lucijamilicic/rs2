import LoginRegistrationModal from "../modals/LoginRegistrationModal";
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
      <LoginRegistrationModal />
    </>
  );
};

export default App;
