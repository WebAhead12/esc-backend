const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const model = require("../model/players");
const bcrypt = require("bcryptjs");
const teams = require("../model/teams");

dotenv.config();
const SECRET = process.env.JWT_SECRET;

function registerP(req, res, next) {
  const username = req.body.username;
  model
    .getPlayer(username)
    .then((find) => {
      console.log(find.length);
      if (find.length == 0) {
        teams.getTeamByEmail(req.body.email).then((email) => {
          console.log(email);
          if (email.length == 0) {
            console.log(req.body);
            model
              .createPlayer(req.body) //function to create a user using the username and passowrd
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

function loginP(req, res, next) {
  const player = req.body;
  //we search for the user
  model
    .getPlayer(player.username)
    .then((find) => {
      //if the getUser function returns and empty array there is not user in our dt
      console.log(req.body);
      if (find.length == 0) {
        const response = { status: "noUser" };
        res.status(401).send(response);
      } else {
        const dbPassword = find[0].password;
        bcrypt.compare(player.password, dbPassword).then((match) => {
          if (!match) {
            res.status(401).send({ status: "wrong password" });
          } else {
            //if it is correct it creates a token
            const token = jwt.sign(
              { username: player.username, id: find[0].id, pot: "player" },
              SECRET
            );
            const response = {
              username: player.username,
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

function playerByGame(req, res, next) {
  const game = req.params.game;
  model
    .getAllPlayers(game)
    .then((players) => {
      res.status(200).send(players);
    })
    .catch(next);
}
function playerByName(req, res, next) {
  console.log(req.params.username);
  model
    .getPlayer(req.params.username)
    .then((player) => {
      res.status(200).send(player);
    })
    .catch(next);
}
function AllPlayers(req, res, next) {
  model
    .getAllPlayers()
    .then((players) => {
      res.status(200).send(players);
    })
    .catch(next);
}
function playerById(req, res, next) {
  id = req.id;
  model
    .getPlayerByID(id)
    .then((player) => {
      res.status(200).send(player);
    })
    .catch(next);
}

module.exports = {
  loginP,
  registerP,
  AllPlayers,
  playerByName,
  playerByGame,
  playerById,
};
