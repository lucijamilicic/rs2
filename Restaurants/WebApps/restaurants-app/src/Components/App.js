import BasketSidebar from "../modals/BasketSidebar";
import "./App.css";
import Header from "./Header/Header";
import React, { useState } from "react";

const App = () => {
  const [isBasketSidebarOpen, setIsBasketSidebarOpen] = useState(false);

  return (
    <>
      <Header className="appHeader" setIsBasketOpen={setIsBasketSidebarOpen} />
      <div className="App">
        <div>Restaurants</div>
      </div>
      <div className="App-overlay" />
      {/* <BasketSidebar
        isOpen={isBasketSidebarOpen}
        setIsOpen={setIsBasketSidebarOpen}
      /> */}
    </>
  );
};

export default App;
