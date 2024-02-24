const router = require("express").Router();
const checkAuth = require("../utils/checkAuth");

const {
  createTeam,
  inviteMember,
  getTeams,
  getMyTeams,
} = require("../controllers/teamController");

router.post("/create", checkAuth, createTeam);

router.post("/invite", checkAuth, inviteMember);

router.get("/all-teams", checkAuth, getTeams);

router.get("/my-teams", checkAuth, getMyTeams);

module.exports = router;
