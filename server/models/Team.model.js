const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const teamSchema = new mongoose.Schema(
  {
    teamUuid: {
      type: String,
      default: uuidv4,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
    teamTagline: {
      type: String,
      required: true,
    },
    teamOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    memebers: [
      {
        memberId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        memberEmail: {
          type: String,
        },
        memberRole: {
          type: String,
          enum: ["Admin", "Member"],
          default: "Member",
        },
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    invitations: [
      {
        invitedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        inviteTo: {
          type: String,
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected"],
          default: "Pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
