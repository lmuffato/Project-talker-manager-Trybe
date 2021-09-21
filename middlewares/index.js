const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const login = require('./login');
const validationToken = require('./validationToken');
const validationTalker = require('./validationTalker');
const validationFieldTalk = require('./validationFieldTalk');
const validationDateAndRate = require('./validationDateAndRate');
const createTalker = require('./createTalker');
const editTalker = require('./editTalker');

module.exports = {
  getAllTalkers,
  getTalkerById,
  login,
  validationToken,
  validationTalker,
  validationFieldTalk,
  validationDateAndRate,
  createTalker,
  editTalker,
};
