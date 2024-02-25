import React from "react";
import classes from "./Forms.module.css";
import Select from "react-select";
import { teamSelector } from "../../store/slices/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { setTeam } from "../../store/slices/teamSlice";

const CreateTaskForm = (props) => {
  const { singleTeam } = useSelector(teamSelector);

  return (
    <div className={classes.createForm}>
      <h1>Create Task</h1>
      <form onSubmit={props.onSubmit}>
        <div className={classes.inputDiv}>
          <label htmlFor="teamName">Title</label>
          <input
            required
            type="text"
            name="taskTitle"
            placeholder="Add Task Title"
            id="teamName"
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="teamName">Description</label>
          <textarea
            type="text"
            name="taskDescription"
            id="taskName"
            placeholder="Add task description"
          />
        </div>
        <div className={classes.inputDiv}>
          <label htmlFor="teamName">Due Date</label>
          <input type="date" name="dueDate" id="teamName" />
        </div>

        <div className={classes.inputDiv}>
          <label htmlFor="tagLine">Assignes</label>
          <Select
            required
            name="assignes"
            options={singleTeam.members.map((member) => ({
              value: member.memberId,
              label: member.memberUserName,
            }))}
            isClearable
            isMulti
          />
        </div>
        <button className={classes.inputDivBtn} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
