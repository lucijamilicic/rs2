import React, { useState } from "react";
import "./RestaurantsListItem.css"
import Menu from "./../Menu/Menu"
import Image from '../../../src/assets/background.jpg'
import { createRestaurants, deleteRestaurantById, updateRestaurantById } from "../../api/Service"
import { Link, useNavigate } from 'react-router-dom'
import EditRestaurantModal from "../../modals/EditRestaurantModal";



const RestaurantsListItem = ({ restaurantInfo, menu}) => {

    const [showMenu, setShowMenu] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const navigate = useNavigate();

    const deleteandler = async () => {
        deleteRestaurantById(restaurantInfo.id);
        navigate("/");
    };

    const editHandler = () => {
        setShowEdit(true);
        //TODO: fali nam komponenta?
    };


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
                <div>
                    <button> delete</button>
                    <button onClick={editHandler}>edit</button>
                </div>
        </div>
        </>
    )
} 

export default RestaurantsListItem;
