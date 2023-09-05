import React, {useState, useEffect} from "react";
import "./Menu.css"
import { Link, useNavigate } from 'react-router-dom'
import DeleteModal from "../../modals/DeleteModal";
import AddToBasketModal from "../../modals/AddToBasketModal";
import { getRole } from "../../common/helpers";


const MenuItem = ({ restaurantId, menuItem }) => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const role = getRole();

    useEffect(() => {

        if (role === "Administrator") {
            setIsAdmin(true);
        }

    }, []);

    const orderHandler = () => {
        setShowOrder(true);
        //TODO: addtobasket api
    };

  
    const cancelHandler = () => {
        setIsDeleteModalOpen(false);
    };

    //TODO
    const deleteItemHandler = async () => {
        
    };

    return (
        <div className="list-item">
            <div className="left-content">
                <div className="food-name" ><Link to={"/details/" + menuItem.id} >{menuItem.mealName}</Link></div>
                <div className="food-price">{menuItem.price}</div>
            </div>
            {!isAdmin && <button className="right-content order-button" onClick={orderHandler}>Order</button>}
            {isAdmin && < button className="right-content order-button" onClick={() => setIsDeleteModalOpen(true)}>Delete</button>}
            <DeleteModal isOpen={isDeleteModalOpen} data={menuItem.mealName} onCancel={cancelHandler} onConfirm={deleteItemHandler} />
            {!isAdmin && showOrder && <AddToBasketModal isOpen={showOrder} name={menuItem.mealName} />}
        </div>
    );
    
};

export default MenuItem;