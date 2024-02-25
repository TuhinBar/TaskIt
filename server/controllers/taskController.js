const Task = require("../models/Task.model");
const Team = require("../models/Team.model");
const User = require("../models/User.model");

const createTask = async (req, res) => {
  try {
    let { title, description, dueDate, createdBy, assignedTo, team } = req.body;

    const userId = req.user._id;

    if (!title || !createdBy || !team) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    if (dueDate === "") {
      dueDate = new Date();
    }

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      createdBy,
      assignedTo,
      team,
    });

    if (!newTask) {
      return res
        .status(400)
        .json({ message: "Task not created", success: false });
    }

    let taskAddedtoTeam = await Team.findByIdAndUpdate(
      team,
      {
        $push: {
          tasks: newTask._id,
        },
      },
      { new: true }
    );

    console.log("task created ==> ✔");

    res.status(201).json({ newTask, message: "Task created", success: true });
  } catch (error) {
    console.log("create task error", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// to get all tasks of a team
const getAllTasks = async (req, res) => {
  try {
    const { teamId } = req.query;

    const tasks = await Task.find({ team: teamId, isDeleted: false })
      .populate("createdBy")
      .populate("assignedTo")
      .populate("team", "teamName");

    if (!tasks) {
      return res
        .status(400)
        .json({ message: "No tasks found", success: false });
    }

    res.status(200).json({ tasks, success: true });
  } catch (error) {
    console.log("getTasks error", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// to get a particulatr task details
const getTaskDetails = async (req, res) => {
  try {
    const { taskId } = req.query;
    console.log("getTaskDetails ==> ✔", taskId);

    // currently is not incorporating isDeleted
    const task = await Task.findById(taskId)
      .populate("assignedTo")
      .populate("createdBy")
      .populate("team", "teamName");

    if (!task) {
      return res.status(400).json({ message: "No task found", success: false });
    }
    console.log("getTaskDetails ==> ✔", task);

    res.status(200).json({ task, success: true });
  } catch (error) {
    console.log("getTaskDetails error", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const getAssignedToMeTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ assignedTo: userId, isDeleted: false })
      .populate("createdBy", "email profilePic")
      .populate("assignedTo", "email profilePic")
      .populate("team", "teamName");

    if (!tasks) {
      return res
        .status(400)
        .json({ message: "No tasks found", success: false });
    }

    console.log("getAssignedToMeTasks ==> ✔", tasks?.length);

    res.status(200).json({ tasks, success: true });
  } catch (error) {
    console.log("getAssignedToMeTasks error", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const updateTask = async (req, res) => {
  try {
    const {
      taskId,
      title,
      description,
      dueDate,
      status,
      assignedTo,
      isDeleted,
    } = req.body;

    if (!taskId || status === undefined) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: {
          status,
          title,
          description,
          updatedAt: Date.now(),
          assignedTo,
          isDeleted: Boolean(isDeleted),
        },
      },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(400)
        .json({ message: "Task not updated", success: false });
    }

    console.log("task updated ==> ✔");

    res
      .status(200)
      .json({ updatedTask, message: "Task updated", success: true });
  } catch (error) {
    console.log("updateTask error", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.query;

    if (!taskId) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const deletedTask = await Task.findByIdAndUpdate(taskId, {
      $set: {
        isDeleted: true,
      },
    });

    if (!deletedTask) {
      return res
        .status(400)
        .json({ message: "Task not deleted", success: false });
    }

    console.log("task deleted ==> ✔");

    res
      .status(200)
      .json({ deletedTask, message: "Task deleted", success: true });
  } catch (error) {
    console.log("deleteTask error", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskDetails,
  getAssignedToMeTasks,
  updateTask,
  deleteTask,
};
