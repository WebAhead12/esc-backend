const db = require("../database/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

function createTeam(team) {
  return bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(team.password, salt))
    .then((hash) => {
      const values = [
        team.teamname,
        hash,
        team.email,
        team.description,
        team.imagelink,
        team.game,
        team.requirements,
      ];
      return db.query(
        "INSERT INTO teams(teamname, password, email, description, imagelink, game, requirements) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, teamname",
        values
      );
    });
}

function getTeam(teamname) {
  return db
    .query(`SELECT * FROM teams WHERE teamname=$1 `, [teamname])
    .then((team) => {
      return team.rows;
    });
}
function getAllTeams(game) {
  return db
    .query(`SELECT * FROM teams WHERE game =$1`, [game])
    .then((teams) => {
      return teams.rows;
    });
}
function getTeamByEmail(email) {
  return db
    .query(`SELECT * FROM teams WHERE email=$1 `, [email])
    .then((team) => {
      return team.rows;
    });
}
module.exports = {
  createTeam,
  getTeam,
  getAllTeams,
  getTeamByEmail,
};
