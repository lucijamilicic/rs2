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
            <div className="restaurant restaurant-item">
                <div className="card">
                    <div className="content-container">
                        <img src={restaurantInfo.img} alt="alternative"></img>
                        <div className="right-container">
                            <div className="upper-container">
                                <div className="name"> {restaurantInfo.restaurantName} </div>
                                <div className="address">{restaurantInfo.address} </div>
                            </div>
                            <div className="bottom-container">
                                {isAdmin && (
                                    <>
                                        <button className="show-menu-button" onClick={deleteHandler}>Remove restaurant</button>
                                        <button className="show-menu-button" onClick={editHandler}>Edit restaurant</button>
                                    </>
                                )}
                                <button className="show-menu-button" onClick={() => setShowMenu(!showMenu)}>{showMenu ? "Hide menu" : "View menu"}</button>
                            </div>
                        </div>
                    </div>
                 </div>
                {
                    
                }
                {showMenu && <Menu restaurantId={restaurantInfo.id} menu={menu} />}
                {isAdmin && 
                    <>
                    {
                        showMenu &&
                        <button className=" show-menu-button" onClick={() => setIsAddItemShown(!isAddItemShown)}>Add item to menu</button>
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
