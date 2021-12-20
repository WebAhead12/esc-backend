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
  console.log(req.body.id);
  model
    .getInvites(req.body.id)
    .then((invites) => {
      res.status(200).send(invites);
    })
    .catch(next);
}

function addRequest(req, res, next) {
  const data = req.body; //teamid playerid + status "pending"

  model
    .postRequest(data)
    .then((invites) => {
      res.status(200).send(invites);
    })
    .catch(next);
}

function addInvite(req, res, next) {
  const data = req.body; //teamid playerid + status "pending"
  model
    .postInvite(data)
    .then((invites) => {
      res.status(200).send(invites);
    })
    .catch(next);
}
function inviteStatus(req, res, next) {
  const data = req.body;
  model
    .updateInvite(data)
    .then((status) => {
      res.status(200).send(status);
    })
    .catch(next);
}

function inviteRequest(req, res, next) {
  const data = req.body;
  const id = req.id;
  model
    .updateRequest(data, id)
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
};
