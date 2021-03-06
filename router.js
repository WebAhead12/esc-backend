const express = require("express");
const router = express.Router();
const players = require("./handlers/players");
const teams = require("./handlers/teams");
const actions = require("./handlers/action");
const verifyAccount = require("./middleware/auth");

router.get("/", (req, res) => {
  res.send({ message: "hi" });
});
//register for player
router.post("/registerP", players.registerP);
//register for team
router.post("/registerT", teams.registerT);
//login for team
router.post("/loginT", teams.loginT);
//login for player
router.post("/loginP", players.loginP);
//get teams by game chosen
router.get("/players", players.AllPlayers);
router.get("/teams", teams.teamsAll);
router.get("/teamProfile", verifyAccount, teams.teamById);
router.get("/playerProfile", verifyAccount, players.playerById);
//get all the players
router.get("/players/:game", players.playerByGame);
router.get("/teams/:game", teams.teamsByGame);
router.get("/Selectedteams/:teamName", teams.teamByName);
router.get("/Selectedplayer/:username", players.playerByName);
//get all the games
router.get("/games", actions.games);
//getting all the requests
router.get("/requests", verifyAccount, actions.getRequests); // middleware
//getting all the invites
router.get("/invites", verifyAccount, actions.getInvites); // middleware
//adding invites
router.post("/addInvites", verifyAccount, actions.addInvite); // middleware
// //adding requests
router.post("/addRequests", verifyAccount, actions.addRequest); // middleware
// //updating requests
router.post("/updateRequests", verifyAccount, actions.inviteRequest); // middleware
// //updating invites
router.post("/updateInvites", verifyAccount, actions.inviteStatus); // middleware
router.post("/checkInvites", verifyAccount, actions.checkInvites); // middleware
router.post("/checkRequests", verifyAccount, actions.checkRequests); // middleware

module.exports = router;
