import React, {useState, useEffect} from "react";
import "./Menu.css"
import { Link, useNavigate } from 'react-router-dom'
import DeleteModal from "../../modals/DeleteModal";
import AddToBasketModal from "../../modals/AddToBasketModal";
import { getRole } from "../../common/helpers";
import { deleteFromMenu, updateBasket } from "../../api/Service";


const MenuItem = ({ restaurantInfo, menuItem }) => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const role = getRole();

    useEffect(() => {

        if (role === "Administrator") {
            setIsAdmin(true);
        }

    }, []);


    const deleteHandler = async () => {
        await deleteFromMenu(restaurantInfo.id, menuItem.id);
        setIsDeleteModalOpen(false);
        window.location.reload();
    }

    const addHandler = async (body) => {

        await updateBasket(body);
        setShowOrder(false);
    };

    return (
        <div className="list-item">
            <div className="left-content">
                <div className="food-name" ><Link to={"/details/" + menuItem.id} >{menuItem.mealName}</Link></div>
                <div className="food-price">{menuItem.price} &euro;</div>
            </div>
            {
                !isAdmin ? (
                    <button className="right-content order-button" onClick={() => setShowOrder(true)}> Order </button>
                ) : (
                    < button className="right-content order-button" onClick={() => setIsDeleteModalOpen(true)}>Delete</button>
                )
            }
            <DeleteModal isOpen={isDeleteModalOpen} name={menuItem.mealName} onCancel={() => setIsDeleteModalOpen(false)} onConfirm={deleteHandler} />
            {!isAdmin && showOrder &&
                <AddToBasketModal
                    isOpen={showOrder}
                    menuItem={menuItem}
                    restaurantInfo={restaurantInfo}
                    onConfirm={addHandler}
                    onCancel={() => setShowOrder(false)}
                />
            }
        </div>
    );
    
};

export default MenuItem;