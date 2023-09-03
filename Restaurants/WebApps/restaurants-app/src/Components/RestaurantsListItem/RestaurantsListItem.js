import React, { useState } from "react";
import "./RestaurantsListItem.css"
import Menu from "./../Menu/Menu"
import Image from '../../../src/assets/background.jpg'



const RestaurantsListItem = ({ restaurantInfo, menu}) => {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
        <div className="restaurant-item">
            <div className="restaurant-card">
                <div className="restaurant-image content">
                        <img src={Image} alt="alternative"></img>
                        <div>
                            <div className="restaurant-name"> {restaurantInfo.restaurantName} </div>
                            <div className="restaurant-address"> {restaurantInfo.address} </div>
                        </div>
                </div>
                
                <div>
                    <button className="show-menu-button" onClick={() => setShowMenu(!showMenu)}>{showMenu ? "Hide menu" : "View menu"}</button>
                </div>
                </div>
                {showMenu && <Menu menu={menu} />}
        </div>
        </>
    )
} 

export default RestaurantsListItem;
