const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const login = require('./login');
const createTalker = require('./createTalker');
const deleteTalker = require('./deleteTalker');
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
    verifyToken,
    verifyName,
    verifyAge,
    verifyData,
    verifyTalk,
    verifyRate,
};
