import React, {useState} from "react";
import "./MenuItem.css"
//import { ReactComponent as BasketIcon } from "../../assets/basket.svg";

const MenuItem = () => {
    return (
        <div className="list-item">
            <div className="left-content"> 
                <div className="food-name">Vesuvio</div>
                <div className="food-price">850RSD</div>
            </div>
            <button className="right-content order-button">Order</button>
        </div>
    );
    
};

export default MenuItem;