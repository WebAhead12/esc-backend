const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const SECRET = process.env.JWT_SECRET;

function verifyAccount(req, res, next) {
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
    }
  } catch (_error) {
    const error = new Error("Invalid token");
    error.status = 401;
    next(error);
  }
}
module.exports = verifyAccount;
