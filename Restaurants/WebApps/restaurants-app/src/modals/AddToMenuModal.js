import React from 'react';
import Modal from 'react-modal';
import { MultiSelect } from "react-multi-select-component";

const AddToMenuModal = ({isOpen }) => {


    return (
        <Modal isOpen={true} className={`modal`}>
            <div className="modal-header">
                <h2>Add item to menu</h2>
            </div>
            <div className="modal-wrap">
                <div class="multi-select-input">
                    <label>Select dish:</label>
                    <MultiSelect
                        labelledBy="Select"
                        options={[]}
                        value={''}
                        disableSearch={false}
                        hasSelectAll={false}
                        /*onChange={(e) => {
                            if (e.length === 0) {
                                setAddItemState({ ...addItemState, id: [] });
                                return;
                            }

                            const value = e[e.length - 1];
                            setAddItemState({ ...addItemState, id: [value] });
                        }}*/

                    />
                </div>
                <div className="input-wrap">
                    <label>Name: </label>
                    <input type="text" name="name" value={''}  />
                </div>
                <div className="input-wrap">
                    <label>Price: </label>
                    <input type="number" name="price" min="0" value={''} />
                </div>
                <div>{''}</div>
                <div className="buttons-wrap">
                    <button className="clear" onClick={() => { } }>Cancel</button>
                    <button className="checkout-button" onClick={() => { } }>Add</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddToMenuModal;