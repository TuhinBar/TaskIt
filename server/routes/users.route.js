const router = require("express").Router();

const { login, register, getUser } = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/user", getUser);

module.exports = router;
