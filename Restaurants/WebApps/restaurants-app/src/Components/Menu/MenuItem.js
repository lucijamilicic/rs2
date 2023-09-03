import React, {useState} from "react";
import "./MenuItem.css"
import { Link, useNavigate } from 'react-router-dom'
//import { ReactComponent as BasketIcon } from "../../assets/basket.svg";

const MenuItem = ({ menuItem }) => {

    const clickHandler = () => {

    }

    return (
        <div className="list-item">
            <div className="left-content">
                <div className="food-name" ><Link to={"/details/" + menuItem.id} >{menuItem.mealName}</Link></div>
                <div className="food-price">{menuItem.price}</div>
            </div>
            <button className="right-content order-button">Order</button>
        </div>
    );
    
};

export default MenuItem;