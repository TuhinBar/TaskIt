import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <span className="close" onClick={props.onClose}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
