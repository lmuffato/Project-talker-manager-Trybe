const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const validateToken = require('./validateToken');
const validateCreateTalker = require('./validateCreateTalker');
const generateToken = require('./generateToken');

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
  validateCreateTalker,
  generateToken,
};
