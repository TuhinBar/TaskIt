import React from "react";
import Modal from "../Modal/Modal";
import classes from "./Forms.module.css";

const DeletePopup = ({ onClose, onDelete }) => {
  return (
    <div>
      <Modal onClose={onClose}>
        <div className={classes.popup}>
          <h1>Delete Task</h1>
          <p>Are you sure you want to delete this task?</p>
          <button onClick={onDelete}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </Modal>
    </div>
  );
};

export default DeletePopup;
