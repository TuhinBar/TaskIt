import React from "react";

const Modal = (props) => {
  return (
    <div className="">
      <div className="modal-content">
        <span className="close" onClick={props.onClose}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
