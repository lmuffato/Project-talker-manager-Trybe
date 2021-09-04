const getTalkers = require('./getTalkers');
const endpoint = require('./endpoint');
const passwordVerification = require('./passwordVerification');
const emailVerification = require('./emailVerification');
const tokenVerification = require('./tokenVerification');
const nameVerification = require('./nameVerification');
const ageVerification = require('./ageVerification');
const watchedAtVerification = require('./watchedAtVerification');
const rateVerification = require('./rateVerification');
const talkObjectVerification = require('./talkObjectVerification');
const setTalkers = require('./setTalkers');

module.exports = {
  getTalkers,
  endpoint,
  passwordVerification,
  emailVerification,
  tokenVerification,
  nameVerification,
  ageVerification,
  watchedAtVerification,
  rateVerification,
  talkObjectVerification,
  setTalkers,
};