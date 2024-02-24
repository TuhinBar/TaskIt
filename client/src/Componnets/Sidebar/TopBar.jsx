import React, { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import classes from "./TopBar.module.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Modal from "../Modal/Modal";

const options = [
  {
    name: "Tasks",
    icon: <FaTasks size={20} />,
    tab: "tasks",
  },
  {
    name: "Members",
    icon: <MdPeople size={20} />,
    tab: "members",
  },
];

const TopBar = () => {
  const query = new URLSearchParams(window.location.search);
  const tab = query.get("tab");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={classes.topbarMain}>
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => navigate(`?tab=${option.tab}`)}
          className={
            tab === option.tab
              ? `${classes.topMenus} ${classes.activeMenu}`
              : classes.topMenus
          }
        >
          {option.icon}
          <p>{option.name}</p>
        </div>
      ))}
      <div>
        <div className={classes.topMenus} onClick={() => setShowModal(true)}>
          <FaPlus size={20} /> Add Task
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Add Task">
          <form>
            <input type="text" placeholder="Task Name" />
            <input type="text" placeholder="Task Description" />
            <button type="submit">Add Task</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default TopBar;
