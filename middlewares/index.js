const showTalkers = require('./showTalkers');
const getTalkerById = require('./getTalkerById');
const login = require('./login');
const validateToken = require('./validateToken');
const validateTalker = require('./validateTalker');
const createTalker = require('./createTalker');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');
const searchTalker = require('./searchTalker');

module.exports = {
  showTalkers,
  getTalkerById,
  login,
  validateToken,
  validateTalker,
  createTalker,
  editTalker,
  deleteTalker,
  searchTalker,
};