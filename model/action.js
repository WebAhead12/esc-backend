const db = require("../database/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

function getGames() {
  return db.query(`SELECT * FROM games`).then((games) => {
    return games.rows;
  });
}
function getInvites(id) {
  return db
    .query(
      `SELECT invites.status, teams.teamname FROM invites LEFT JOIN teams ON invites.teamid = teams.id WHERE playerid = $1`,
      [id]
    )
    .then((invites) => {
      return invites.rows;
    });
}
function getRequests(id) {
  return db
    .query(
      `SELECT requests.status, player.username FROM requests LEFT JOIN players ON requests.playerid = player.id WHERE teamid = $1`,
      [id]
    )
    .then((requests) => {
      return requests.rows;
    });
}
function postRequest(data, id) {
  return db
    .query(
      `INSERT INTO requests (playerid, teamid) VALUES ($1, $2) RETURNING id,status`,
      [id, teamid]
    )
    .then((request) => {
      return request.rows;
    });
}
function postInvite(data, id) {
  return db
    .query(
      `INSERT INTO invites (playerid, teamid) VALUES ($1, $2) RETURNING id,status`,
      [playerid, id]
    )
    .then((invite) => {
      return invite.rows;
    });
}
function updateRequest(data, id) {
  const { playerid, status } = data;
  return db
    .query(
      `UPDATE requests SET status = $1 WHERE playerid = $2 AND teamid = $3 RETURNING status`,
      [status, playerid, id]
    )
    .then((status) => {
      return status.rows;
    });
}
function updateInvite(data, id) {
  const { teamid, status } = data;
  return db
    .query(
      `UPDATE invites SET status = $1 WHERE playerid = $2 AND teamid = $3 RETURNING status`,
      [status, id, teamid]
    )
    .then((status) => {
      return status.rows;
    });
}
module.exports = {
  getGames,
  getInvites,
  getRequests,
  postRequest,
  postInvite,
  updateRequest,
  updateInvite,
};
