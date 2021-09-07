const getTalkers = require('./getTalkers');
const talkerId = require('./talkerId');
const { login, generateToken, validateEmail, validatePassword } = require('./login');

module.exports = { getTalkers, talkerId, login, generateToken, validateEmail, validatePassword };
