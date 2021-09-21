const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const login = require('./login');
const {
  validationToken,
  validationTalker,
  validationFieldTalk,
  validationDateAndRate,
  createTalker,
} = require('./createTalker');

module.exports = {
  getAllTalkers,
  getTalkerById,
  login,
  validationToken,
  validationTalker,
  validationFieldTalk,
  validationDateAndRate,
  createTalker,
};
