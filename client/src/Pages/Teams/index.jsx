import React from "react";
import QuickAccessBar from "../../Componnets/Sidebar/QuickAccessBar";
import classes from "./Teams.module.css";
import { useParams } from "react-router-dom";

const Teams = () => {
  const { slug } = useParams();
  return (
    <div className={classes.bodyContainer}>
      <div className={classes.subBarDiv}>
        <QuickAccessBar />
      </div>
    </div>
  );
};

export default Teams;
