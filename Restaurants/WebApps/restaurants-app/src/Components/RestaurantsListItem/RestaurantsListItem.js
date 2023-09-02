import React, { useState } from "react";
import "./RestaurantsListItem.css"
import Menu from "./../Menu/Menu"



const RestaurantsListItem = ({ restaurantInfo }) => {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="restaurant-card">
            <div className="restaurant-name"> {restaurantInfo.name} </div>
            <div className="restaurant-address"> {restaurantInfo.address} </div>
            {showMenu ? <Menu/> : <></>}
            <button className="show-menu-button" onClick={() => setShowMenu(!showMenu)}>{showMenu ? "Hide menu" : "View menu"}</button>
        </div>
    )
} 

export default RestaurantsListItem;
