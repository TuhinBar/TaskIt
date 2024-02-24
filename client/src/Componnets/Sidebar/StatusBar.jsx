import React from "react";
import { FcTodoList } from "react-icons/fc";
import { TbProgress } from "react-icons/tb";
import { FaRegCircleCheck } from "react-icons/fa6";
import classes from "./StatusBar.module.css";

const statusList = [
  { icon: <FcTodoList size={20} />, status: "Todo" },
  { icon: <TbProgress size={20} />, status: "Doing" },
  { icon: <FaRegCircleCheck size={20} />, status: "Done" },
];

const StatusBar = () => {
  return (
    <div className={classes.statusMain}>
      {statusList.map((item) => (
        <div key={item.status} className={classes.items}>
          {item.icon}
          <span>{item.status}</span>
        </div>
      ))}
    </div>
  );
};

export default StatusBar;
