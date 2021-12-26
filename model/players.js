const db = require("../database/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

function createPlayer(player) {
  return bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(player.password, salt))
    .then((hash) => {
      const values = [
        player.username,
        hash,
        player.firstname,
        player.lastname,
        player.email,
        player.date,
        player.languages,
        player.gender,
        player.imagelink,
        player.location,
        player.stats,
      ];
      return db.query(
        "INSERT INTO players(username, password, firstname, lastname, email, age, languages, gender, imagelink, location,stats) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING id, username",
        values
      );
    });
}

function getPlayer(username) {
  return db
    .query(`SELECT * FROM players WHERE username=$1 `, [username])
    .then((player) => {
      return player.rows;
    });
}
function getPlayerByEmail(email) {
  return db
    .query(`SELECT * FROM players WHERE email=$1 `, [email])
    .then((player) => {
      return player.rows;
    });
}

function getAllPlayers() {
  return db.query(`SELECT * FROM players `).then((players) => {
    return players.rows;
  });
}

function getPlayerByID(id) {
  return db.query(`SELECT * FROM players WHERE id=$1 `, [id]).then((player) => {
    return player.rows;
  });
}
module.exports = {
  createPlayer,
  getPlayer,
  getAllPlayers,
  getPlayerByEmail,
  getPlayerByID,
};
