const express = require("express");
const router = express.Router();
const players = require("./handlers/players");
const teams = require("./handlers/teams");
const actions = require("./handlers/action");
const verifyAccount = require("./middleware/auth");

router.get("/", (req, res) => {
  res.send({ message: "hi" });
});

router.post("/registerP", players.registerP);
router.post("/registerT", teams.registerT);
router.post("/loginT", teams.loginT);
router.post("/loginP", players.loginP);
//get all the teams
router.get("/teams/:game", teams.teams);
router.get("/Selectedteams/:teamName", teams.teamByName);
router.get("/teams", teams.teamsAll);
//get all the players
router.get("/players/:game", players.allPlayers);
//get all the games
router.get("/games", actions.games);
//getting all the requests
router.get("/requests", actions.getRequests); // middleware
//getting all the invites
router.post("/invites", actions.getInvites); // middleware
//adding invites
router.post("/addInvites", actions.addInvite); // middleware
// //adding requests
router.post("/addRequests", actions.addRequest); // middleware
// //updating requests
router.post("/updateRequests", actions.inviteRequest); // middleware
// //updating invites
router.post("/updateInvites", actions.inviteStatus); // middleware

module.exports = router;
