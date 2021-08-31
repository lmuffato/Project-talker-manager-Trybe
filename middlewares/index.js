const { getTalkers } = require('./getTalkers');
const { generateToken } = require('./generateToken');
const { validateEmail } = require('./validateEmail');
const { validatePassword } = require('./validatePassword');

module.exports = {
  getTalkers,
  generateToken,
  validateEmail,
  validatePassword,
};