const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const login = require('./login');
const createTalker = require('./createTalker');
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
    verifyToken,
    verifyName,
    verifyAge,
    verifyData,
    verifyTalk,
    verifyRate,
};
