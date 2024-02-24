import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import classes from "./QuickAccessBar.module.css";
import Modal from "../../Componnets/Modal/Modal";
import { useDispatch } from "react-redux";
import { createTeam } from "../../store/features/teamAction";

let teams = [
  {
    name: "Team 1",
    members: [
      {
        name: "John Doe",
        role: "Admin",
      },
      {
        name: "Jane Doe",
        role: "Member",
      },
    ],
  },
  {
    name: "Team 2",
    members: [
      {
        name: "John Doe",
        role: "Admin",
      },
      {
        name: "Jane Doe",
        role: "Member",
      },
    ],
  },
  {
    name: "Team 3",
    members: [
      {
        name: "John Doe",
        role: "Admin",
      },
      {
        name: "Jane Doe",
        role: "Member",
      },
    ],
  },
  {
    name: "Team 4",
    members: [
      {
        name: "John Doe",
        role: "Admin",
      },
      {
        name: "Jane Doe",
        role: "Member",
      },
    ],
  },
  {
    name: "Team 5",
    members: [
      {
        name: "John Doe",
        role: "Admin",
      },
      {
        name: "Jane Doe",
        role: "Member",
      },
    ],
  },
];

const QuickAccessBar = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleTeamCreate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const teamName = formData.get("teamName");
    const teamTagLine = formData.get("tagLine");

    dispatch(createTeam({ teamName, teamTagLine }));
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
        <div>
          <input type="text" placeholder="Search" />
          <button>
            <FaMagnifyingGlass size={20} />
          </button>
        </div>
      </div>
      <div>
        {teams.map((team, index) => (
          <div key={index}>
            <h3>{team.name}</h3>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <h1>Create Team</h1>
            <form onSubmit={handleTeamCreate}>
              <div>
                <label htmlFor="teamName">Team Name</label>
                <input required type="text" name="teamName" id="teamName" />
              </div>
              <div>
                <label htmlFor="tagLine">Tag line</label>
                <input type="text" name="tagLine" id="tagLine" />
              </div>
              <button type="submit">Create</button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default QuickAccessBar;
