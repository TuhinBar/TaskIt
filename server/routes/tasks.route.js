const router = require("express").Router();
const checkAuth = require("../utils/checkAuth");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router
  .route("/")
  .post(checkAuth, createTask)
  .get(checkAuth, getTasks)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask);

module.exports = router;
