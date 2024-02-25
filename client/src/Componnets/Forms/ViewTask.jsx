import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import classes from "./Forms.module.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../store/features/teamAction";
import { teamSelector } from "../../store/slices/teamSlice";

const ViewTask = ({ task, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const { singleTask, viewTaskSuccess } = useSelector(teamSelector);
  const [updateTaskData, setUpdateTaskData] = useState(singleTask);
  useEffect(() => {
    dispatch(
      getTaskDetails({
        taskId: task._id,
      })
    );
    if (viewTaskSuccess) {
      setUpdateTaskData(singleTask);
      console.log(updateTaskData);
    }
  }, [dispatch]);
  return (
    <div>
      <Modal task={task} onClose={onClose}>
        <div className={classes.createForm}>
          <h1>View Task</h1>
          <form onSubmit={onSubmit}>
            <div className={classes.inputDiv}>
              <label htmlFor="teamName">Title</label>
              <input
                required
                value={updateTaskData?.title}
                onChange={(e) =>
                  setUpdateTaskData({
                    ...updateTaskData,
                    title: e.target.value,
                  })
                }
                type="text"
                name="taskTitle"
                id="teamName"
              />
            </div>
            <div className={classes.inputDiv}>
              <label htmlFor="teamName">Description</label>
              <textarea
                onChange={(e) =>
                  setUpdateTaskData({
                    ...updateTaskData,
                    description: e.target.value,
                  })
                }
                value={updateTaskData?.description}
                type="text"
                name="taskDescription"
                id="taskName"
                placeholder="Add task description"
              />
            </div>
            <div className={classes.inputDiv}>
              <label htmlFor="teamName">Due Date</label>
              <input
                type="date"
                onChange={(e) =>
                  setUpdateTaskData({
                    ...updateTaskData,
                    dueDate: e.target.value,
                  })
                }
                name="dueDate"
                value={updateTaskData?.dueDate?.split("T")[0] || ""}
                id="teamName"
              />
            </div>

            <div className={classes.inputDiv}>
              <label htmlFor="tagLine">Status</label>
              <Select
                required
                value={updateTaskData?.status}
                name="status"
                onChange={(e) =>
                  setUpdateTaskData({
                    ...updateTaskData,
                    status: e,
                  })
                }
                options={[
                  { value: "Pending", label: "Pending" },
                  { value: "Ongoing", label: "Ongoing" },
                  { value: "Completed", label: "Completed" },
                ]}
                isClearable
              />
            </div>
            <div className={classes.inputDiv}>
              <label htmlFor="tagLine">Assignes</label>
              <Select
                required
                name="assignes"
                onChange={(e) =>
                  setUpdateTaskData({
                    ...updateTaskData,
                    assignedTo: e,
                  })
                }
                options={singleTask?.assignedTo?.map((member) => ({
                  value: member._id,
                  label: member.userName,
                }))}
                isClearable
                isMulti
              />
            </div>
            <button className={classes.inputDivBtn} type="submit">
              Update
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ViewTask;
