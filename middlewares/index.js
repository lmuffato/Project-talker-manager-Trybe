const { getTalkers } = require('./getTalkers');
const { generateToken } = require('./generateToken');
const { validateEmail } = require('./validateEmail');
const { validatePassword } = require('./validatePassword');
const { validateToken } = require('./validateToken');
const { talkerFormValidations } = require('./talker_form_validations');
const { addTalker } = require('./addTalker');

module.exports = {
  getTalkers,
  generateToken,
  validateEmail,
  validatePassword,
  validateToken,
  talkerFormValidations,
  addTalker,
};