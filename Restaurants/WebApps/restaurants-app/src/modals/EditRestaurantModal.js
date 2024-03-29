import React from "react";
import Modal from "react-modal";
import "./Modal.css"
import { useState, useEffect } from "react";

const EditRestaurantModal = ({ isOpen, data, onConfirm, onCancel }) => {

    const isEdit = data;
    const [state, setState] = useState({
        img: '',
        restaurantName: '',
        address: '',
    });

    useEffect(() => {
        isEdit && setState({
            ...data,
            img: data.img,
            restaurantName: data.restaurantName,
            address: data.address,
        });
        
    }, [isOpen]);


    const textInputHandler = (e) => {
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
    }

    const clearState = () => {
        setState({
            img: '',
            restaurantName: '',
            address: '',
        });
        setValidationErr("");
    };

    const [validationErr, setValidationErr] = useState("");

    const isValid = () => {
        if (state.restaurantName === '' || state.address === '') {
            setValidationErr("Restaurant name and addres are required");
            return false;
        }
        setValidationErr("");
        return true;
    }

    return (
        <Modal
            isOpen={isOpen}
            className="modal"
        >
            <div className="modal-header">
                {isEdit ? "Edit restaurant" : "Add restaurant"}
            </div>
            <div className="modal-wrap">
                
                <div className="input-wrap">
                    <label>* Name</label>
                    <input type="text" placeholder="Name" name="restaurantName" maxLength="30" size="10" value={state.restaurantName} onChange={textInputHandler} />
                </div>
                <div className="input-wrap">
                    <label>* Address</label>
                    <input type="text" placeholder="Address" name="address" maxLength="30" size="10" value={state.address} onChange={textInputHandler} />
                </div>
                <div className="input-wrap">
                    <label>Image URL</label>
                    <input type="text" placeholder="Image url" name="img" size="10" value={state.img} onChange={textInputHandler} />
                </div>
                <div className="validation-err-add">{validationErr}</div>
                <div className="buttons-wrap">
                    <button
                        onClick={() => {
                            onCancel();
                            clearState();
                        }}
                        className="clear">Cancel</button>
                    <button onClick={() => {
                        if (isValid()) {
                            onConfirm(state);
                            setState({
                                img: '',
                                restaurantName: '',
                                address: '',
                            });
                        }
                    }
                    } className="checkout-button">Confirm</button>
                </div>
            </div>
        </Modal>
   );
};

export default EditRestaurantModal;