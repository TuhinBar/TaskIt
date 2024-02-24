const router = require("express").Router();
const checkAuth = require("../utils/checkAuth");

const {
  createTeam,
  inviteMember,
  getTeams,
  getMyTeams,
} = require("../controllers/teamController");
const {
  createTask,
  getTaskDetails,
  getAllTasks,
  getAssignedToMeTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/create", checkAuth, createTeam);

router.post("/invite", checkAuth, inviteMember);

router.get("/all-teams", checkAuth, getTeams);

router.get("/my-teams", checkAuth, getMyTeams);

router.get("/tasks", checkAuth, getAllTasks);

router.get("/task", checkAuth, getTaskDetails);

router.post("/create-task", checkAuth, createTask);

router.put("/update-task", checkAuth, updateTask);

router.delete("/delete-task", checkAuth, deleteTask);

router.get("/tasks/assigned-to-me", checkAuth, getAssignedToMeTasks);

module.exports = router;
