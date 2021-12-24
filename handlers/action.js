const model = require("../model/action");
const teamModel = require("../model/teams");

function games(req, res, next) {
  model
    .getGames()
    .then((games) => {
      res.status(200).send(games);
    })
    .catch(next);
}
function getRequests(req, res, next) {
  model
    .getRequests(req.id)
    .then((requests) => {
      res.status(200).send(requests);
    })
    .catch(next);
}
function getInvites(req, res, next) {
  model
    .getInvites(req.id)
    .then((invites) => {
      res.status(200).send(invites);
    })
    .catch(next);
}

function addRequest(req, res, next) {
  const teamid = req.body.teamid; //teamid playerid + status "pending"
  const id = req.id;
  model
    .postRequest(id, teamid)
    .then((invites) => {
      res.status(200).send(invites);
    })
    .catch(next);
}

function addInvite(req, res, next) {
  const playerid = req.body.playerid; //teamid playerid + status "pending"
  const id = req.id;
  model
    .postInvite(id, playerid)
    .then((invites) => {
      res.status(200).send(invites);
    })
    .catch(next);
}
function inviteStatus(req, res, next) {
  // for player
  const data = req.body;
  const id = req.id;
  model
    .updateInvite(data, id)
    .then((status) => {
      res.status(200).send(status);
    })
    .catch(next);
}

function inviteRequest(req, res, next) {
  //for team
  const data = req.body;
  const id = req.id;
  model
    .updateRequest(data, id)
    .then((status) => {
      res.status(200).send(status);
    })
    .catch(next);
}

function checkInvites(req, res, next) {
  const playerid = req.body.playerid;
  const id = req.id; //player id
  model
    .checkInvites(playerid, id)
    .then((status) => {
      res.status(200).send(status);
    })
    .catch(next);
}
function checkRequests(req, res, next) {
  const teamid = req.body.teamid;
  const id = req.id; //team id
  model
    .checkRequests(teamid, id)
    .then((status) => {
      res.status(200).send(status);
    })
    .catch(next);
}

module.exports = {
  games,
  getInvites,
  getRequests,
  addRequest,
  addInvite,
  inviteStatus,
  inviteRequest,
  checkRequests,
  checkInvites,
};
