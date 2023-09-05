import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./DeleteModal.css"
import {ReactComponent as CancelImage} from "../assets/cancel-img.svg";

const DeleteModal = ({ isOpen, data, onConfirm, onCancel }) => {

    return (
        <Modal
            isOpen={isOpen}
            className="modal"
        >
            <div className="modal-wrap">
                <CancelImage className="cancel-img" onClick={onCancel} />
                <h2>Are you sure?</h2>
                <p>Do you really want to delete <span>{data.name}</span>? This process cannot be undone. </p>
                <div className="button-wrap">
                    <button onClick={onCancel} className="button-delete">Cancel</button>
                    <button onClick={() => onConfirm(data.id)} className="button-delete">Confirm</button>
                </div>
            </div>
        </Modal>
   );
};

export default DeleteModal;