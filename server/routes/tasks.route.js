const router = require("express").Router();
const checkAuth = require("../utils/checkAuth");
const {
  createTask,
  getTaskDetails,
  getAssignedToMeTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router
  .route("/")
  .post(checkAuth, createTask)
  .get(checkAuth, getTaskDetails)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask);

router.get("/assigned-to-me", checkAuth, getAssignedToMeTasks);

module.exports = router;
