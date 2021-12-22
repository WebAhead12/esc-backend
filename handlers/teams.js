const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const model = require("../model/teams");
const bcrypt = require("bcryptjs");
dotenv.config();
const SECRET = process.env.JWT_SECRET;
const player = require("../model/players");

function registerT(req, res, next) {
  const teamname = req.body.teamname;
  console.log(req.body);
  model
    .getTeam(teamname)
    .then((find) => {
      console.log(find);
      if (find.length == 0) {
        player.getPlayerByEmail(req.body.email).then((email) => {
          if (email.length == 0) {
            model
              .createTeam(req.body) //function to create a user using the username and passowrd
              .then((id) => {
                const response = {
                  ...id.rows[0],
                  status: "success",
                };
                res.status(200).send(response);
              })
              .catch(next);
          } else {
            const response = { status: "player is using email" };
            res.status(401).send(response);
          }
        });
      } else {
        const response = { status: "username taken" };
        res.status(401).send(response);
      }
    })
    .catch(next);
}

function loginT(req, res, next) {
  const team = req.body;
  console.log(team);
  //we search for the user
  model
    .getTeam(team.teamname)
    .then((find) => {
      console.log(find);
      //if the getUser function returns and empty array there is not user in our dt
      if (find.length == 0) {
        const response = { status: "noUser" };
        res.status(401).send(response);
      } else {
        const dbPassword = find[0].password;
        bcrypt.compare(team.password, dbPassword).then((match) => {
          if (!match) {
            res.send({ status: "wrong password" });
          } else {
            //if it is correct it creates a token
            const token = jwt.sign(
              { teamname: team.teamname, id: find[0].id, pot: "team" },
              SECRET
            );
            const response = {
              teamname: team.teamname,
              access_token: token,
              success: true,
            };
            res.status(200).send(response);
          }
        });
      }
    })
    .catch(next);
}
function teams(req, res, next) {
  const game = req.params.game;
  model
    .getTeamsByGame(game)
    .then((teams) => {
      res.status(200).send(teams);
    })
    .catch(next);
}

function teamById(req, res, next) {
  const id = req.id;
  model.getTeamById(id).then((team) => {
    res.status(200).send(team);
  });
}
function teamsAll(req, res, next) {
  model
    .getAllTeams()
    .then((teams) => {
      res.status(200).send(teams);
    })
    .catch(next);
}
function teamByName(req, res, next) {
  console.log(req.params.teamName);
  model
    .getTeam(req.params.teamName)
    .then((team) => {
      res.status(200).send(team);
    })
    .catch(next);
}
module.exports = { loginT, registerT, teams, teamsAll, teamByName, teamById };
