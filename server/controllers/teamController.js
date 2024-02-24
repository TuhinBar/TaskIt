const Task = require("../models/Task.model");
const User = require("../models/User.model");
const Team = require("../models/Team.model");

const createTeam = async (req, res) => {
  try {
    let { teamName, teamTagline } = req.body;

    if (!teamTagline) {
      teamTagline = "";
    }

    if (!teamName) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const ownerId = req.user._id;
    console.log(ownerId);

    const team = new Team({
      teamName,
      teamTagline,
      teamOwner: ownerId,
      members: [
        { memberId: ownerId, memberRole: "Admin", memberEmail: req.user.email },
      ],
    });
    await team.save();
    let user = await User.findById(ownerId);
    user.teams.push(team._id);
    await user.save();
    res
      .status(201)
      .json({ team, owner: user, message: "Team created", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const inviteMember = async (req, res) => {
  try {
    // this teamId is mongoId, not the uuid teamId
    const { email, teamId } = req.body;
    if (!email || !teamId) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const ownerId = req.user._id;

    const team = await Team.findOneAndUpdate(
      { _id: teamId, teamOwner: ownerId },
      {
        $push: {
          invitations: {
            invitedBy: ownerId,
            inviteTo: email,
            status: "Pending",
          },
        },
      },
      { new: true }
    );
    if (!team) {
      return res.status(400).json({ message: "Team not found" });
    }

    // add the invitation to the user model
    const invitedUser = await User.findOneAndUpdate(
      {
        email,
      },
      {
        $push: {
          invitations: {
            teamId, // mongoId of the team
            teamName: team.teamName,
            invitationFrom: ownerId,
            status: "Pending",
          },
        },
      },
      {
        new: true,
      }
    );

    if (!invitedUser) {
      return res
        .status(400)
        .json({ message: "User not found, can not invite", success: false });
    }

    res.status(200).json({
      message: "Invitation sent",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { createTeam, inviteMember };
