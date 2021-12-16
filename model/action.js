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
    .query(`SELECT * FROM invites WHERE id =$1`, [id])
    .then((invites) => {
      return invites.rows;
    });
}
function getRequests(id) {
  return db
    .query(`SELECT * FROM requests WHERE id =$1`, [id])
    .then((requests) => {
      return requests.rows;
    });
}
function postRequest(data, id) {
  const { player_id, team_id } = data;
  return db
    .query(
      `INSERT INTO requests (playerid, teamid) VALUES ($1, $2) RETURNING id,status`,
      [player_id, team_id]
    )
    .then((request) => {
      return request.rows;
    });
}
function postInvite(data, id) {
  const { player_id, team_id } = data;
  return db
    .query(`INSERT INTO invites (playerid, teamid) VALUES ($1, $2)`, [
      player_id,
      team_id,
    ])
    .then((invite) => {
      return invite.rows;
    });
}
function updateRequest(data) {
  const { teamid, playerid, status } = data;
  console.log(teamid, playerid, status);
  return db
    .query(
      `UPDATE requests SET status = $1 WHERE playerid = $2 AND teamid = $3 RETURNING status`,
      [status, playerid, teamid]
    )
    .then((status) => {
      return status.rows;
    });
}
function updateInvite(data) {
  const { playerid, teamid, status } = data;
  return db
    .query(
      `UPDATE invites SET status = $1 WHERE playerid = $2 AND teamid = $3 RETURNING status`,
      [status, playerid, teamid]
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
