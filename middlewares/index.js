const getTalkers = require('./getTalkers');
const findTalkerById = require('./findTalkerById');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const generateToken = require('./generateToken');
const validateToken = require('./validateToken');
const validateName = require('./validadeName');
const validateAge = require('./validateAge');
const validateTalk = require('./validateTalk');
const addTalker = require('./addTalker');

module.exports = {
  getTalkers,
  findTalkerById,
  validateEmail,
  validatePassword,
  generateToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  addTalker,
};