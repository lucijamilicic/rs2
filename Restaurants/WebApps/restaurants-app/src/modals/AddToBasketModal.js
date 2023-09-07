import React, { useState } from "react";
import Modal from "react-modal";

const AddToBasketModal = ({ isOpen, menuItem, restaurantInfo, onConfirm, onCancel }) => {

    const buyerUsername = localStorage.getItem('userName');
    const buyerEmail = localStorage.getItem('userEmail');

    const [foodOrder, setFoodOrder] = useState({
        dishName: menuItem.mealName,
        dishId: menuItem.id,
        extraNote: '',
        quantity: 1,
        price: menuItem.price,
    })

  const incrementQuantity = () => {
      const newQuantity = foodOrder.quantity + 1;
      setFoodOrder({ ...foodOrder, quantity: newQuantity });
  };

      const decrementQuantity = () => {
          const newQuantity = foodOrder.quantity - 1;

        if (newQuantity <= 0) {
            setFoodOrder({ ...foodOrder, quantity: 0 });
          return;
        }

          setFoodOrder({ ...foodOrder, quantity: newQuantity });
    };

    const addHandler = () => {
        const body = {
            buyerUsername,
            buyerEmail,
            deliveryAddress: 'asv',
            restaurantName: restaurantInfo.restaurantName,
            restaurantId: (restaurantInfo.id).toString(),
            orderedItem: {
                ...foodOrder,
            }
        };

        onConfirm(body);
    };

  return (
    <Modal isOpen={isOpen} className={`modal`}>
      <div className="modal-header">
        <h2>Add basket item</h2>
      </div>
          <div className="modal-wrap">
              <h2 className="meal-name">{menuItem.mealName}</h2>
        <div className="note-input">
          <label>Add extra note for the restaurant: </label>
          <textarea
             name="extraNote"
             value={foodOrder.extraNote}
              onChange={(e) => {
                 setFoodOrder({
                    ...foodOrder,
                    extraNote: e.target.value,
                 });
              }}
          />
        </div>
        <div className="quantity-buttons">
          <button onClick={decrementQuantity}>-</button>
          <p>{foodOrder.quantity}</p>
          <button onClick={incrementQuantity}>+</button>
         </div>
              <div className="buttons-wrap">
                  <button className="clear" onClick={onCancel}>Cancel</button>
                  <button className="checkout-button" onClick={addHandler}>Add</button>
              </div>
      </div>
    </Modal>
  );
};

export default AddToBasketModal;
