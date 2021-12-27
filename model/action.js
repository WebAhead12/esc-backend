const db = require("../database/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const req = require("express/lib/request");

function getGames() {
  return db.query(`SELECT * FROM games`).then((games) => {
    return games.rows;
  });
}
function getInvites(id) {
  return db
    .query(
      `SELECT invites.status,invites.teamid,teams.teamname,teams.name, teams.email FROM invites LEFT JOIN teams ON invites.teamid = teams.id WHERE playerid = $1`,
      [id]
    )
    .then((invites) => {
      return invites.rows;
    });
}
function getRequests(id) {
  return db
    .query(
      `SELECT requests.status,requests.playerid, players.username, players.email FROM requests LEFT JOIN players ON requests.playerid = players.id WHERE teamid = $1`,
      [id]
    )
    .then((requests) => {
      return requests.rows;
    });
}
function postRequest(id, teamid) {
  return db
    .query(
      `INSERT INTO requests (playerid, teamid) VALUES ($1, $2) RETURNING id,status`,
      [id, teamid]
    )
    .then((request) => {
      return request.rows;
    });
}
function postInvite(id, playerid) {
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
function checkInvites(playerid, id) {
  console.log(playerid, id);
  return db
    .query(`SELECT * FROM invites WHERE playerid = $1 AND teamid = $2`, [
      playerid,
      id,
    ])
    .then((invite) => {
      return invite.rows;
    });
}
function checkRequests(teamid, id) {
  return db
    .query(`SELECT * FROM requests WHERE playerid = $1 AND teamid = $2`, [
      id,
      teamid,
    ])
    .then((requests) => {
      console.log("ss", requests.rows);

      return requests.rows;
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
  checkInvites,
  checkRequests,
};
