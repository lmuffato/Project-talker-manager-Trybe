const validateAge = require('./validateAge');
const validateName = require('./validateName');
const validateToken = require('./validateToken');
const validateTalk = require('./validateTalk');
const validateRateAndWatchedAt = require('./validateRateAndWatchedAt');

module.exports = [
  validateToken,
  validateAge,
  validateName,
  validateTalk,
  validateRateAndWatchedAt,
];
