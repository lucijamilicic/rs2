import React, { useState } from "react";
import Modal from "react-modal";

const AddToBasketModal = (props) => {

//const [state, setState] = useState<>()
  const { isOpen, name } = props;
  const [extraNote, setExtraNote] = useState("");
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

      const decrementQuantity = () => {
        const newQuantity = quantity - 1;

        if (newQuantity <= 0) {
          setQuantity(0);
          return;
        }

        setQuantity(newQuantity);
    };

    const addHandler = () => {

        

    };

  return (
    <Modal isOpen={isOpen} className={`modal`}>
      <div className="modal-header">
        <h2>{ "Add basket item"}</h2>
      </div>
      <div className="modal-wrap">
        <h2>{name}</h2>
        <div className="note-input">
          <label>Add extra note for the restaurant: </label>
          <textarea
            name="extraNote"
            value={extraNote}
            onChange={(e) => setExtraNote(e.target.value)}
          />
        </div>
        <div className="quantity-buttons">
          <button onClick={decrementQuantity}>-</button>
          <p>{quantity}</p>
          <button onClick={incrementQuantity}>+</button>
         </div>
              <div className="add-buttons">
                  <button className="order-buttons" onClick={() => { } }>Cancel</button>
                  <button className="order-buttons" onClick={addHandler}>Add</button>
              </div>
      </div>
    </Modal>
  );
};

export default AddToBasketModal;
