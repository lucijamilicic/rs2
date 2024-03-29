import React from "react";
import Modal from "react-modal";
import "./Modal.css"
import {ReactComponent as CancelImage} from "../assets/cancel-img.svg";

const DeleteModal = ({ isOpen, name, onConfirm, onCancel }) => {

    return (
        <Modal
            isOpen={isOpen}
            className="modal"
        >
            <div className="modal-wrap">
                <CancelImage className="cancel-img" onClick={onCancel} />
                <h2>Are you sure?</h2>
                <p>Do you really want to delete <span>{name}</span>? This process cannot be undone. </p>
                <div className="buttons-wrap">
                    <button onClick={onCancel} className="clear">Cancel</button>
                    <button onClick={onConfirm} className="checkout-button">Confirm</button>
                </div>
            </div>
        </Modal>
   );
};

export default DeleteModal;