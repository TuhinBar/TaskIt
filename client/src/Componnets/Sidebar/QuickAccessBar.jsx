import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import classes from "./QuickAccessBar.module.css";
import Modal from "../../Componnets/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { teamSelector } from "../../store/slices/teamSlice";
import { createTeam, getAllTeams } from "../../store/features/teamAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const QuickAccessBar = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teams, success, error, loading } = useSelector(teamSelector);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (success) {
      setShowModal(false);
      toast.success("Team created successfully");
      dispatch(getAllTeams());
    }
    if (error) {
      //   console.log(error);
      toast.error(error);
    }
  }, [success, error]);

  useEffect(() => {
    dispatch(getAllTeams());
    // console.log(teams);
  }, [dispatch]);

  const handleTeamCreate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const teamName = formData.get("teamName");
    const teamTagline = formData.get("tagLine");

    if (!teamName) {
      toast.error("Please enter team name");
      return;
    }

    dispatch(createTeam({ teamName, teamTagline }));
  };
  return (
    <div className={classes.mainBarContainer}>
      <div className={classes.headContent}>
        <div className={classes.heading}>
          <h1>Teams</h1>
          <span onClick={() => setShowModal(true)}>
            <FaPlus size={20} />
          </span>
        </div>
        <div className={classes.searchTeams}>
          <input type="text" placeholder="Search" />
          <span>
            <FaMagnifyingGlass size={20} />
          </span>
        </div>
      </div>
      <div className={classes.teamsTabs}>
        {teams ? (
          teams.map((team, index) => (
            <div
              key={index}
              onClick={() => navigate(`/teams/${team._id}`)}
              className={
                slug === team._id ? classes.teamNamesActive : classes.teamNames
              }
            >
              <h3>{team.teamName}</h3>
              {/* <small>{team.teamTagline}</small> */}
            </div>
          ))
        ) : loading ? (
          <h1>Loading...</h1>
        ) : (
          <h4>No teams found</h4>
        )}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={classes.createForm}>
            <h1>Create Team</h1>
            <form onSubmit={handleTeamCreate}>
              <div className={classes.inputDiv}>
                <label htmlFor="teamName">Team Name</label>
                <input required type="text" name="teamName" id="teamName" />
              </div>
              <div className={classes.inputDiv}>
                <label htmlFor="tagLine">Tag line</label>
                <input type="text" name="tagLine" id="tagLine" />
              </div>
              <button className={classes.inputDivBtn} type="submit">
                Create
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default QuickAccessBar;
