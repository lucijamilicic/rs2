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

    const [menuState, setMenuState] = useState([]);

    useEffect(() => {

        if (role === "Administrator") {
            setIsAdmin(true);
        }

        setMenuState(menu);

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

    const deleteConfirm = async () => {
        await deleteRestaurantById(restaurantInfo.id).catch((e) => { console.log(e) });
        setIsDeleteModalOpen(false);
        setRefresh(true);
        window.location.reload();
    };

    const editConfirm = async (body) => {
        await updateRestaurantById(body).then(() => {
            setIsEditModalOpen(false);
            setRefresh(true);
            window.location.reload();
        }).catch((e) => { console.log(e) });
    };

    const [validationErr, setValidationErr] = useState("");
    const isValid = () => {
        if (addItemState.id.length <= 0 || addItemState.name === '' || !addItemState.price || addItemState.price === '') {
            setValidationErr("All fields are required");
            return false;
        }
        else if (addItemState.price < 0) {
            setValidationErr("Price must be positive")
            return false
        }

        setValidationErr('');
        return true;
    }

    const addMenuItemHandler = async () => {

        if (isValid()) {

        const body = {
            id: addItemState.id[0].value,
            mealName: addItemState.name,
            price: addItemState.price,
        };

            await addToMenu(restaurantInfo.id, body).then(() => {
                setMenuState([...menuState, body]);
                setIsAddItemShown(false);
                setValidationErr('');
            }).catch((e) => {
                if (e.response.data.status === 409) {
                    setValidationErr('Item already exists in this menu')
                }
                else {
                    console.log(e);
                }
            });

        }
    };


    const inputHandler = (e) => {
        const { name, value } = e.target;

        setAddItemState({
            ...addItemState,
            [name]: value,
        })
    }

    const clearState = () => {
        setAddItemState({ id: [], name: '', price: '' })
        setValidationErr('');
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
                {showMenu && <Menu restaurantInfo={restaurantInfo} menu={menuState} key={menuState} />}
                {isAdmin && 
                    <>
                    {
                        showMenu &&
                        <button className=" show-menu-button" onClick={() => { setIsAddItemShown(!isAddItemShown); clearState() }}>Add item to menu</button>
                    }
                    {
                        isAddItemShown && showMenu &&  
                            <div className="add-item-wrap">
                                <div>
                                <label>Select dish:</label>
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
                                    <input type="number" name="price" min="0" value={addItemState.price} onChange={inputHandler} />
                                </div>
                                <div className="validation-err-add">{validationErr}</div>
                                <button onClick={addMenuItemHandler} className="add-item-button">Add</button>
                            </div>
                    }
                </>
                }
            </div>
            <DeleteModal isOpen={isDeleteModalOpen} name={restaurantInfo.restaurantName}  onCancel={deleteCancel} onConfirm={deleteConfirm} />
            <EditRestaurantModal isOpen={isEditModalOpen} data={restaurantInfo} onConfirm={editConfirm} onCancel={editCancel} />
        </>
    )
} 

export default RestaurantsListItem;
