import React, { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import classes from "./TopBar.module.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Modal from "../Modal/Modal";
import { userSelector } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { createTask } from "../../store/features/teamAction";
import CreateTaskForm from "../Forms/CreateTaskForm";
import { teamSelector } from "../../store/slices/teamSlice";
import { toast } from "react-toastify";
import { getAllTeams } from "../../store/features/teamAction";

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
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const tab = query.get("tab");
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  const { singleTeam, addTaskSuccess } = useSelector(teamSelector);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (addTaskSuccess) {
      setShowModal(false);
      dispatch(getAllTeams());
      toast.success("Task created successfully");
    }
  }, [addTaskSuccess, dispatch]);

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let reqData = {
      title: formData.get("taskTitle"),
      description: formData.get("taskDescription"),
      dueDate: formData.get("dueDate"),
      assignedTo: formData.getAll("assignes"),
      createdBy: user._id,
      team: singleTeam._id,
    };
    dispatch(createTask(reqData));
  };
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
          <CreateTaskForm onSubmit={handleTaskSubmit} />
        </Modal>
      )}
    </div>
  );
};

export default TopBar;
