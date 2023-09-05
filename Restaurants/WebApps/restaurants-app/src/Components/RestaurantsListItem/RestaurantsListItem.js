import React, { useState, useEffect } from "react";
import "./RestaurantsListItem.css"
import Menu from "./../Menu/Menu"
import Image from '../../../src/assets/background.jpg'
import { addToMenu, createRestaurants, deleteRestaurantById, getRecipes, updateRestaurantById } from "../../api/Service"
import { Link, useNavigate } from 'react-router-dom'
import EditRestaurantModal from "../../modals/EditRestaurantModal";
import DeleteModal from "../../modals/DeleteModal";
import { MultiSelect } from "react-multi-select-component";
import { getRole } from "../../common/helpers";



const RestaurantsListItem = ({ setRefresh, restaurantInfo, menu, recipesOptions }) => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddItemShown, setIsAddItemShown] = useState(false);
    const [addItemState, setAddItemState] = useState({
        id: [],
        name: '',
        price: '',
    });
    const role = getRole();

    useEffect(() => {

        if (role === "Administrator") {
            setIsAdmin(true);
        }

    }, []);


    const deleteHandler = () => {
        setIsDeleteModalOpen(true);
    };

    const editHandler = () => {
        setIsEditModalOpen(true);
    };

    const deleteCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const editCancel = () => {
        setIsEditModalOpen(false);
    };

    const deleteConfirm = async (id) => {
        await deleteRestaurantById(restaurantInfo.id);
        setIsDeleteModalOpen(false);
        setRefresh(true);
    };

    const editConfirm = async (body) => {
        await updateRestaurantById(body);
        setIsEditModalOpen(false);
        setRefresh(true);
    };

    const addMenuItemHandler = async () => {

        const body = {
            id: addItemState.id[0].value,
            mealName: addItemState.name,
            price: addItemState.price,
        };

        await addToMenu(restaurantInfo.id, body);
        setIsAddItemShown(false);

    };

    const deleteMenuItem = async () => {

    }

    const inputHandler = (e) => {
        const { name, value } = e.target;

        setAddItemState({
            ...addItemState,
            [name]: value,
        })
    }


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
                    <button className="show-menu-button" onClick={() => setShowMenu(!showMenu)}>{showMenu ? "Hide menu" : "View menu"}</button>
                 </div>
                {
                    isAdmin && (
                        <div>
                            <button className="show-menu-button" onClick={deleteHandler}>Remove restaurant</button>
                            <button className="show-menu-button" onClick={editHandler}>Edit restaurant</button>
                        </div>
                    )
                }
                {showMenu && <Menu restaurantId={restaurantInfo.id} menu={menu} />}
                {isAdmin && 
                    <>
                    {
                        showMenu &&
                        <button className="show-menu-button" onClick={() => setIsAddItemShown(!isAddItemShown)}>Add item to menu</button>
                    }
                    {
                        isAddItemShown &&  
                            <div className="add-item-wrap">
                                <div>
                                    <MultiSelect
                                        labelledBy="Select"
                                        options={recipesOptions}
                                        value={addItemState.id}
                                        disableSearch={false}
                                        hasSelectAll={false}
                                        onChange={(e) => {
                                            if (e.length === 0) {
                                                setAddItemState({ ...addItemState, id: [] });
                                                return;
                                            }

                                            const value = e[e.length - 1];
                                            setAddItemState({ ...addItemState, id: [value] });
                                        } }

                                    />
                                </div>
                                <div className="input-wrap">
                                    <label>Name: </label>
                                    <input type="text" name="name" value={addItemState.name} onChange={inputHandler} />
                                </div>
                                <div className="input-wrap">
                                    <label>Price: </label>
                                    <input type="number" name="price" value={addItemState.price} onChange={inputHandler} />
                                </div>
                                <button onClick={addMenuItemHandler}>Add</button>
                            </div>
                    }
                </>
                }
            </div>
            <DeleteModal isOpen={isDeleteModalOpen} data={restaurantInfo} onCancel={deleteCancel} onConfirm={deleteConfirm} />
            <EditRestaurantModal isOpen={isEditModalOpen} data={restaurantInfo} onConfirm={editConfirm} onCancel={editCancel} />
        </>
    )
} 

export default RestaurantsListItem;
