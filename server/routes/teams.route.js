const router = require("express").Router();
const checkAuth = require("../utils/checkAuth");

const { createTeam, inviteMember } = require("../controllers/teamController");

router.post("/create", checkAuth, createTeam);

router.post("/invite", checkAuth, inviteMember);

module.exports = router;
