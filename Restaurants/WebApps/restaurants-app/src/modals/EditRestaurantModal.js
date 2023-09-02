import React from "react";
import Modal from "react-modal";
import "./EditRestaurantModal.css"
//import {ReactComponent as CancelImage} from "../assets/cancel-img.svg";

const EditRestaurantModal= ({isOpen, text, onCofirm, onCancel})=>{
   return( <Modal isOpen className="modal" >
       <div className="modal-wrap">
           NAME
           <input type="text" className="input" placeholder="name" name="nameRestaurant" maxlength="30" size="10" />
           ADDRESS
           <input type="text" className="input" placeholder="address" name="address" maxlength="30" size="10" />

           <h2>Are you sure?</h2>
           <p>Do you really want to edit {text}?  </p>
           <div className="button-wrap">
               <button onClick={onCofirm} className="button-delete">Confirm</button>
               <button onClick={onCancel} className="button-delete">Cancel</button>
           </div>
        </div>
    </Modal>
   );
};

export default EditRestaurantModal;