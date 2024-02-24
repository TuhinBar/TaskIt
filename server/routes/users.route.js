const router = require("express").Router();
const checkAuth = require("../utils/checkAuth");

const { login, register, getUser } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/user", checkAuth, getUser);

module.exports = router;
