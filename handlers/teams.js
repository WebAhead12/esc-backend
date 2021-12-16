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
      if (find.length == 0) {
        player.getPlayerByEmail(req.body.email).then((email) => {
          if (email.length == 0) {
            model
              .createTeam(req.body) //function to create a user using the username and passowrd
              .then((id) => {
                res.status(401).send(id.rows[0]);
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
              { teamname: team.teamname, id: find[0].id },
              SECRET
            );
            const response = {
              teamname: team.teamname,
              access_token: token,
              status: "",
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
    .getAllTeams(game)
    .then((teams) => {
      res.status(200).send(teams);
    })
    .catch(next);
}

module.exports = { loginT, registerT, teams };
