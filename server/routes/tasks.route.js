const router = require("express").Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router
  .route("/")
  .post(createTask)
  .get(getTasks)
  .put(updateTask)
  .delete(deleteTask);
