const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const taskSchema = new mongoose.Schema(
  {
    uuid: {
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
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
