import React from "react";
import { useSelector } from "react-redux";
import { teamSelector } from "../../store/slices/teamSlice";
import TopBar from "../../Componnets/Sidebar/TopBar";
import StatusBar from "../../Componnets/Sidebar/StatusBar";
import classes from "./Teams.module.css";

const SingleTeam = () => {
  const { singleTeam } = useSelector(teamSelector);
  console.log(singleTeam);
  return (
    <div className={classes.teamView}>
      <h1>Team {singleTeam?.teamName}</h1>
      <TopBar />
      <StatusBar />
      <div></div>
    </div>
  );
};

export default SingleTeam;
