const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const login = require('./login');
const createTalker = require('./createTalker');
const deleteTalker = require('./deleteTalker');
const editTalker = require('./editTalker');
const {
    verifyToken,
    verifyName,
    verifyAge,
    verifyData,
    verifyTalk,
    verifyRate,
  } = require('./verifications');

module.exports = {
    getAllTalkers,
    getTalkerById,
    login,
    createTalker,
    deleteTalker,
    editTalker,
    verifyToken,
    verifyName,
    verifyAge,
    verifyData,
    verifyTalk,
    verifyRate,
};
