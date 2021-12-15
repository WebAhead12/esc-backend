const model = require("../model/action");

function games(req, res, next) {
  model
    .getGames()
    .then((games) => {
      res.status(200).send(games);
    })
    .catch(next);
}
function getRequests(req, res, next) {
  if (req.username) {
    model.getRequests
      .then((requests) => {
        res.status(200).send(requests);
      })
      .catch(next);
  }
}
function getInvites(req, res, next) {
  model.getInvites
    .then((invites) => {
      res.status(200).send(invites);
    })
    .catch(next);
}
module.exports = {
  games,
  getInvites,
  getRequests,
};
