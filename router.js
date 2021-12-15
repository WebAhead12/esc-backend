const express = require("express");
const router = express.Router();
const players = require("./handlers/players");
const teams = require("./handlers/teams");

router.get("/", (req, res) => {
  res.send({ message: "hi" });
});

router.post("/registerP", players.registerP);
router.post("/registerT", teams.registerT);
router.get("/teams", teams.teams);

module.exports = router;
