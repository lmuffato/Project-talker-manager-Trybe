const getTalkers = require('./getTalkers');
const findTalkerById = require('./findTalkerById');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const generateToken = require('./generateToken');
const validateToken = require('./validateToken');

module.exports = {
  getTalkers,
  findTalkerById,
  validateEmail,
  validatePassword,
  generateToken,
  validateToken,
};