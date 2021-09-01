const { validateName } = require('./validateName');
const { validateAge } = require('./validateAge');
const { validateDate } = require('./validateDate');
const { validateRate } = require('./validateRate');
const { validateTalk } = require('./validateTalk');

const talkerFormValidations = [
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
];

module.exports = { talkerFormValidations };