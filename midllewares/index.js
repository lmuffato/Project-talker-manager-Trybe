const talker = require('./talker');
const talkerId = require('./talkerId');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const generateToken = require('./generateToken');
const validateTalkerName = require('./validadeTalkerName');
const validateDate = require('./validateDate');
const validateRate = require('./validateRate');
const validateTalk = require('./validateTalk');
const validateTalkerAge = require('./validateTalkerAge');
const validateToken = require('./validateToken');
const writeTalker = require('./writeTalker');
const updateTalker = require('./updatetalker');
const test = require('./testMiddleware');

module.exports = {
    talker,
    talkerId,
    validateEmail,
    validatePassword,
    generateToken,
    validateDate,
    validateTalkerAge,
    validateTalkerName,
    validateRate,
    validateTalk,
    validateToken,
    writeTalker,
    updateTalker,
    test,
};