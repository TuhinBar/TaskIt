import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { teamSelector } from "../../store/slices/teamSlice";
import { setSingleTask } from "../../store/slices/teamSlice";
import TopBar from "../../Componnets/Sidebar/TopBar";
import StatusBar from "../../Componnets/Sidebar/StatusBar";
import classes from "./Teams.module.css";
import { MdDelete } from "react-icons/md";
import ViewTask from "../../Componnets/Forms/ViewTask";
import { updateTask } from "../../store/features/teamAction";

const SingleTeam = () => {
  const dispatch = useDispatch();
  const { singleTeam, singleTask } = useSelector(teamSelector);
  // console.log(singleTask);
  // console.log(singleTeam);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [viewSingleTask, setViewSingleTask] = useState(false);

  useEffect(() => {
    if (singleTeam) {
      setPendingTasks(
        singleTeam.tasks.filter((task) => task.status === "Pending")
      );
      setInProgressTasks(
        singleTeam.tasks.filter((task) => task.status === "Ongoing")
      );
      setCompletedTasks(
        singleTeam.tasks.filter((task) => task.status === "Completed")
      );
    }
  }, [singleTeam]);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reData = {
      taskId: singleTask._id,

      title: formData.get("taskTitle"),
      description: formData.get("taskDescription"),
      dueDate: formData.get("dueDate"),
      status: formData.get("status"),
      assignedto: formData.getAll("assignes"),
    };
    dispatch(updateTask(reData));
    setViewSingleTask(false);
  };
  return (
    <div className={classes.teamView}>
      <h1>Team {singleTeam?.teamName}</h1>
      <TopBar />
      <StatusBar />
      <div className={classes.tasksDiv}>
        <div className={classes.pendingTasks}>
          {pendingTasks?.map((task) => (
            <div
              key={task._id}
              draggable
              onClick={() => {
                setViewSingleTask(true);
                dispatch(setSingleTask(task));
              }}
              className={classes.task}
            >
              <div>
                <h3>{task.title}</h3>
                <span>
                  <MdDelete size={20} />
                </span>
              </div>
              <p>{task.description}</p>
              <small>{task.status}</small>
            </div>
          ))}
        </div>
        <div className={classes.inProgressTasks}>
          {inProgressTasks?.map((task) => (
            <div
              key={task._id}
              onClick={() => {
                setViewSingleTask(true);
                dispatch(setSingleTask(task));
              }}
              className={classes.task}
            >
              <div>
                <h3>{task.title}</h3>
                <span>
                  <MdDelete size={20} />
                </span>
              </div>
              <p>{task.description}</p>
              <small>{task.status}</small>
            </div>
          ))}
        </div>
        <div className={classes.completedTasks}>
          {completedTasks?.map((task) => (
            <div
              key={task._id}
              onClick={() => {
                setViewSingleTask(true);
                dispatch(setSingleTask(task));
              }}
              className={classes.task}
            >
              <div>
                <h3>{task.title}</h3>
                <span>
                  <MdDelete size={20} />
                </span>
              </div>
              <p>{task.description}</p>
              <small>{task.status}</small>
            </div>
          ))}
        </div>
      </div>

      {viewSingleTask && (
        <ViewTask
          task={singleTask}
          onSubmit={handleUpdateTask}
          onClose={() => setViewSingleTask(false)}
        />
      )}
    </div>
  );
};

export default SingleTeam;
