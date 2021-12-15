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
  return db.query(`INSERT INTO request (username, first_name) VALUES ('oliverjam', 'oli');
    `);
}

module.exports = {
  getGames,
  getInvites,
  getRequests,
  postRequest,
};
