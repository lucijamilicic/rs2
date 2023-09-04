import React from "react";
import Modal from "react-modal";
import "./Modal.css"
import { useState, useEffect } from "react";

//import {ReactComponent as CancelImage} from "../assets/cancel-img.svg";

const EditRestaurantModal = ({ isOpen, data, onConfirm, onCancel }) => {

    const isEdit = data;
    const [state, setState] = useState({
        restaurantName: '',
        address: '',
    });

    useEffect(() => {
        isEdit && setState({
            ...data,
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
            restaurantName: '',
            address: '',
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            className="modal"
        >
            <div className="modal-wrap">
                <div className="input-wrap">
                    <label>Name</label>
                    <input type="text" placeholder="Name" name="restaurantName" maxLength="30" size="10" value={state.restaurantName} onChange={textInputHandler} />
                </div>
                <div className="input-wrap">
                    <label>Address</label>
                    <input type="text" placeholder="Address" name="address" maxLength="30" size="10" value={state.address} onChange={textInputHandler} />
                </div>
                <div className="button-wrap">
                    <button
                        onClick={() => {
                            onCancel();
                            clearState();
                        }}
                        className="button-delete">Cancel</button>
                    <button onClick={() => onConfirm(state)} className="button-delete">Confirm</button>
                </div>
            </div>
        </Modal>
   );
};

export default EditRestaurantModal;