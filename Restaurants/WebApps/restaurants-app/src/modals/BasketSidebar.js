import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { ReactComponent as CancelIcon } from "../assets/cancel.svg";
import { ReactComponent as BasketIcon } from "../assets/basket.svg";
import { ReactComponent as ArrowIcon } from "../assets/double-arrow.svg";
import "./Modal.css";
import { getBasket, updateBasket, checkout } from "../api/Service";

const BasketListItem = ({ restaurantId, restaurantName, order }) => {
    const { price, quantity, extraNote, dishName, dishId } = order;
    const buyerUsername = localStorage.getItem('userName');
    const buyerEmail = localStorage.getItem('userEmail');

    const [state, setState] = useState({
        price: price,
        quantity: quantity,
        extraNote: extraNote,
      });

      const [edit, setEdit] = useState(false);

      const deleteItemHandler = () => {
        // call API for delete
      };

      const incrementQuantity = () => {
        const newQuantity = state?.quantity + 1;
        setState({ ...state, quantity: newQuantity });
      };

      const decrementQuantity = () => {
        const newQuantity = state?.quantity - 1;

        if (newQuantity <= 0) {
          setState({ ...state, quantity: 0 });
          return;
        }

        setState({ ...state, quantity: newQuantity });
      };

      const onCancel = () => {
        setState({ extraNote, quantity });
        setEdit(false);
      };

    const onEditItem = async () => {
        const body = {
            restaurantName,
            restaurantId,
            deliveryAddress: '',
            buyerUsername,
            buyerEmail,
            orderedItem: {
                ...state,
                dishId,
                dishName,
            },

        }
        await updateBasket(body);
        setEdit(false);
      };

  return (
    <>
      <div className="basket-item">
        <div className="content">
          <div className="item-restaurant-name">{restaurantName}</div>
          <div className="item">
            {quantity} x {dishName}
          </div>
          <div className="item-price">{quantity * price} &euro;</div>
        </div>
        <div className="header-buttons">
          <EditIcon
            onClick={() => {
              setEdit(!edit);
            }}
          />
          <CancelIcon onClick={deleteItemHandler} />
        </div>
      </div>
      <div className={`edit-container ${edit ? "open" : "closed"}`}>
        <div className="note-input">
          <label>Add extra note for the restaurant: </label>
          <textarea
            name="extraNote"
            value={state.extraNote}
            onChange={(e) => setState({ ...state, extraNote: e.target.value })}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div className="quantity-buttons">
            <button onClick={decrementQuantity}>-</button>
            <p>{state?.quantity}</p>
            <button onClick={incrementQuantity}>+</button>
          </div>
          <div className="buttons-wrap edit">
            <button onClick={onCancel} className="clear">
              Cancel
            </button>
            <button type="submit" className="checkout-button" onClick={onEditItem}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const BasketSidebar = ({ isOpen, setIsOpen }) => {

    const AddressErr = "Delivery address is required"
    const zeroItemsErr = "Basket is empty. Nothing to order."


    const [basket, setBasket] = useState();
    const [listOfItems, setListOfItems] = useState([]);


    useEffect(() => {

        const username = localStorage.getItem('userName');

        const getBasketItems = async () => {
            const basket = await getBasket(username).catch(error => []);
            basket.data.buyerEmailAddress = localStorage.getItem("userEmail");
            setBasket(basket.data);
            setListOfItems(basket.data.orderItems);
        }

        if (isOpen) {
           getBasketItems();
        }

    }, [isOpen]);


    const [basketErr, setBasketErr] = useState("");

    const isValidBasket = () => {
        if (basket.orderItems.length <= 0) {
            setBasketErr(zeroItemsErr);
            return false;
        }
        else if (basket.deliveryAddress.length <= 0) {
            setBasketErr(AddressErr);
            return false;
        }
        else {
            setBasketErr("");
        }
    }

    const onCheckout = async () => {
        if (isValidBasket()) {
            await checkout(basket).then((res) => {
                setBasket({ ...basket, deliveryAddress: "", orderItems: [], totalPrice: 0.0 });
                setIsOpen(false);
            });

        }
    }

  return (
    <>
      {isOpen ? (
        <div className="sidebar open">
          <div className="basket-header">
            <ArrowIcon onClick={() => setIsOpen(false)} />
            <div className="basket-headline">
              <BasketIcon />
              <h2>Basket</h2>
            </div>
          </div>
          <div className="list">
                      {listOfItems?.map((restaurant, i) => {
                          return restaurant?.foodOrder.map((order, j) => {
                              return <BasketListItem key={`${i}${j}`} restaurantId={ restaurant?.restaurantId} restaurantName={restaurant?.restaurantName} order={order}/>
                          })
                      })}
          </div>
          <div className="total-price">
            Total price: <span> {basket?.totalPrice} &euro;</span>
          </div>
          <input
            type="text"
            placeholder="Enter delivery address"
            className="address-input"
                      name="deliveryAddress"
                      onChange={(e) => { setBasket({ ...basket, deliveryAddress: e.target.value }) }}
            required
          />
          <div className="basket-err">{basketErr}</div>
                  { /*DELETE BASKET*/}
          <div className="buttons-wrap">
                      <button onClick={() => { } } className="clear">
              Clear basket
                      </button>
            <button type="submit" className="checkout-button" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="sidebar closed"></div>
      )}
    </>
  );
};

export default BasketSidebar;