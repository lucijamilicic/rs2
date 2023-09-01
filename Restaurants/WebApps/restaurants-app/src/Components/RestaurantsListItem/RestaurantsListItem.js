import React, { useState } from "react";
import "./RestaurantsListItem.css"



const RestaurantsListItem = ({ restaurantInfo }) => {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="restaurant-card">
            <p> {restaurantInfo.name} </p>
            <p> {restaurantInfo.address} </p>
            <button className="show-menu-button" onClick={() => setShowMenu(!showMenu)}>View menu</button>
            {showMenu ? < p > menu items ....</p> : <></>}
        </div>
    )
} 

export default RestaurantsListItem;
