import React from "react";
import QuickAccessBar from "../../Componnets/Sidebar/QuickAccessBar";
import classes from "./Teams.module.css";

const Teams = () => {
  return (
    <div className={classes.bodyContainer}>
      <div className={classes.subBarDiv}>
        <QuickAccessBar />
      </div>
      <div>Nothing to see here</div>
    </div>
  );
};

export default Teams;
