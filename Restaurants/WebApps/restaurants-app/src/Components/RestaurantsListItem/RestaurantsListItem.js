import React, { useState } from "react";
import "./RestaurantsListItem.css"
import Menu from "./../Menu/Menu"



const RestaurantsListItem = ({ restaurantInfo, menu}) => {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="restaurant-card">
            <div className="restaurant-name"> {restaurantInfo.restaurantName} </div>
            <div className="restaurant-address"> {restaurantInfo.address} </div>
            {showMenu ? <Menu menu={menu} /> : <></>}
            <button className="show-menu-button" onClick={() => setShowMenu(!showMenu)}>{showMenu ? "Hide menu" : "View menu"}</button>
        </div>
    )
} 

export default RestaurantsListItem;
