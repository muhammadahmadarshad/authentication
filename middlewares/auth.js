const jwt = require('jsonwebtoken');
const config = require("../config/default");

module.exports = function (req, res, next) {
  const token = req.header('auth');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config['jwt-key']);
    req.user = decoded; 
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}