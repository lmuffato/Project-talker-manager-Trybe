const validateToken = require('./validateToken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateTalk = require('./validateTalk');
const validateWatchedRate = require('./validateWatchedRate');

const validateNewSpeaker = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedRate,
};

module.exports = validateNewSpeaker;