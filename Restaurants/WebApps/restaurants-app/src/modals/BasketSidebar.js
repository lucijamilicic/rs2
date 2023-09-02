import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { ReactComponent as CancelIcon } from "../assets/cancel.svg";
import { ReactComponent as BasketIcon } from "../assets/basket.svg";
import { ReactComponent as ArrowIcon } from "../assets/double-arrow.svg";
import "./Modal.css";

const BasketListItem = (props) => {
  const { restaurantName, name, price, quantity, extraNote } = props.item;
  console.log(quantity);
  const [state, setState] = useState({
    quantity,
    extraNote,
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

  const onSave = () => {
    //call edit API
    setEdit(false);
  };

  return (
    <>
      <div className="basket-item">
        <div className="content">
          <div className="item-restaurant-name">{restaurantName}</div>
          <div className="item">
            {quantity} x {name}
          </div>
          <div className="item-price">{quantity * price} RSD</div>
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
            value={extraNote}
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
            <button type="submit" className="checkout-button" onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const BasketSidebar = ({ isOpen, setIsOpen }) => {
  const [listOfItems, setListOfItems] = useState([
    { restaurantName: "restaurant 1", name: "lala", price: 5.66, quantity: 3 },
    { restaurantName: "restaurant 2", name: "lala1", price: 14, quantity: 1 },
    {
      restaurantName: "restaurant 3",
      name: "lala111",
      price: 2.5,
      quantity: 7,
    },
  ]);

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    const prices = listOfItems.map((item) => item.price * item.quantity);
    return prices.reduce((acc, price) => acc + price, 0);
  };

  useEffect(() => {
    const total = calculateTotalPrice().toPrecision(4);
    setTotalPrice(total);
  }, [listOfItems]);

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
            {listOfItems?.map((item) => (
              <BasketListItem item={item} setState={setListOfItems} />
            ))}
          </div>
          <div className="total-price">
            Total price: <span> {totalPrice} RSD</span>
          </div>
          <input
            type="text"
            placeholder="Enter delivery address"
            className="address-input"
            required
          />
          <div className="buttons-wrap">
            <button onClick={() => setListOfItems([])} className="clear">
              Clear basket
            </button>
            <button type="submit" className="checkout-button">
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
