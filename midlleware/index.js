const token = require('./token');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const searchTerm = require('./searchTerm');

const midllewares = {
  validateEmail,
  validatePassword,
  token,
  searchTerm,
};

module.exports = midllewares;