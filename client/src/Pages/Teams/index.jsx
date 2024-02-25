import React, { useEffect } from "react";
import QuickAccessBar from "../../Componnets/Sidebar/QuickAccessBar";
import classes from "./Teams.module.css";
import { useNavigate, useParams } from "react-router-dom";
import SingleTeam from "./SingleTeam";
import { useSelector } from "react-redux";
import { teamSelector } from "../../store/slices/teamSlice";

const Teams = () => {
  const navigate = useNavigate();
  const { teams } = useSelector(teamSelector);
  const { slug } = useParams();
  const ifTeamExist = teams?.find((team) => team._id === slug);

  useEffect(() => {
    if (!ifTeamExist && teams.length > 0) {
      navigate(`/teams/${teams[0]._id}?tab=tasks`);
    }
  }, [teams, slug]);
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
