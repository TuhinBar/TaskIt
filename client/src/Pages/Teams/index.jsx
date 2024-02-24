import React, { useEffect } from "react";
import QuickAccessBar from "../../Componnets/Sidebar/QuickAccessBar";
import classes from "./Teams.module.css";
import { useParams } from "react-router-dom";
import SingleTeam from "./SingleTeam";
import { useSelector } from "react-redux";
import { teamSelector } from "../../store/slices/teamSlice";

const Teams = () => {
  const { teams } = useSelector(teamSelector);
  const params = useParams();
  console.log(params);

  // useEffect(() => {
  //   if (teams.length > 0 && !slug) {
  //     window.location.href = `/teams/${teams[0].slug}`;
  //   } else if (teams.length === 0) {
  //   }
  // }, [teams, slug]);
  return (
    <div className={classes.bodyContainer}>
      <div className={classes.subBarDiv}>
        <QuickAccessBar />
      </div>
      <div className={classes.taskView}>
        <SingleTeam />
      </div>
    </div>
  );
};

export default Teams;
