const express = require("express");
const router = express.Router();
const players = require("./handlers/players");
const teams = require("./handlers/teams");
const actions = require("./handlers/action");

router.get("/", (req, res) => {
  res.send({ message: "hi" });
});

router.post("/registerP", players.registerP);
router.post("/registerT", teams.registerT);
router.post("/loginT", teams.loginT);
router.post("/loginP", players.loginP);
router.get("/teams", teams.teams);
router.get("/players", players.players);
router.get("/games", actions.games);
router.get("/requests", actions.getRequests); // middleware
router.get("/invites", actions.getInvites); // middleware
router.post("/invites", actions.); // middleware
router.post("/requests", actions.); // middleware



module.exports = router;
