import React from "react";
import Modal from "react-modal";
import "./DeleteModal.css"
import {ReactComponent as CancelImage} from "../assets/cancel-img.svg";

const DeleteModal= ({isOpen, text, onCofirm, onCancel})=>{
   return( <Modal isOpen className="modal" >
        <div className="modal-wrap">
            <CancelImage className="cancel-img" />
            <h2>Are you sure?</h2>
            <p>Do you really want to delete {text}? This process cannot be undone. </p>
            <div className="button-wrap">
                <button onClick={onCancel} className="button-delete">Cancel</button>
                <button onClick={onCofirm} className="button-delete">Confirm</button>
            </div>
        </div>
    </Modal>
   );
};

export default DeleteModal;