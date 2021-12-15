const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const SECRET = process.env.JWT_SECRET;

function verifyPlayer(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new Error("Authorization header required");
    error.status = 400;
    next(error);
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const tokenData = jwt.verify(token, SECRET);
    req.username = tokenData.username;
    req.id = tokenData.id;
    next();
  } catch (_error) {
    const error = new Error("Invalid token");
    error.status = 401;
    next(error);
  }
}

function verifyPlayer(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new Error("Authorization header required");
    error.status = 400;
    next(error);
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const tokenData = jwt.verify(token, SECRET);
    if (req.username) {
      req.username = tokenData.username;
      req.id = tokenData.id;
      next();
    } else {
      req.teamname = tokenData.teamname;
      req.id = tokenData.id;
      next();
    }
  } catch (_error) {
    const error = new Error("Invalid token");
    error.status = 401;
    next(error);
  }
}
module.exports = { verifyPlayer, verif };
