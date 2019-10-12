const jwt = require('jsonwebtoken');

module.exports.generateToken = (id, role) => {
  return jwt.sign({id, role}, process.env.JWT_SECRET);
}

module.exports.verifyToken = (token) => {
  let user = jwt.verify(token, process.env.JWT_SECRET);
  return user;
}