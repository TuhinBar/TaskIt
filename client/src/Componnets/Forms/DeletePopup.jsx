import React from "react";
import Modal from "../Modal/Modal";

const DeletePopup = () => {
  return (
    <div>
      <Modal>
        <div>
          <h1>Delete Task</h1>
          <p>Are you sure you want to delete this task?</p>
          <button>Yes</button>
          <button>No</button>
        </div>
      </Modal>
    </div>
  );
};

export default DeletePopup;
