const tokenValidate = require('./tokenValidate');
const nameValidate = require('./nameValidate');
const ageValidate = require('./ageValidate');
const {
  talkValidate,
  rateValidate,
  watchedAtValidate,
} = require('./talkValidate');

const validations = [
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  rateValidate,
  watchedAtValidate,
];

module.exports = validations;
