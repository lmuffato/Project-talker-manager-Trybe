const { getTalkers } = require('./getTalkers');
const { generateToken } = require('./generateToken');
const { validateEmail } = require('./validateEmail');
const { validatePassword } = require('./validatePassword');
const { validateToken } = require('./validateToken');
const { validateName } = require('./validateName');
const { validateAge } = require('./validateAge');
const { validateDate } = require('./validateDate');
const { validateRate } = require('./validateRate');
const { validateTalk } = require('./validateTalk');
const { addTalker } = require('./addTalker');

module.exports = {
  getTalkers,
  generateToken,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateTalk,
  addTalker,
};