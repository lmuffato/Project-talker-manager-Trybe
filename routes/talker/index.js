const talker = require('express').Router();
const getAllTalkers = require('./readAll');
const getOneTalkerById = require('./readOne');
const searchTalkers = require('./readMaybe');
const addTalker = require('./create');
const editTalker = require('./update');
const removeTalker = require('./delete');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./validate');

const TALKER_ID = '/:id';
talker.get('/', getAllTalkers);
talker.get('/search', validateToken);
talker.get('/search', searchTalkers);
talker.get(TALKER_ID, getOneTalkerById);
talker.post('/', validateToken);
talker.post('/', validateName);
talker.post('/', validateAge);
talker.post('/', validateTalk);
talker.post('/', validateWatchedAt);
talker.post('/', validateRate);
talker.post('/', addTalker);
talker.put(TALKER_ID, validateToken);
talker.put(TALKER_ID, validateName);
talker.put(TALKER_ID, validateAge);
talker.put(TALKER_ID, validateTalk);
talker.put(TALKER_ID, validateWatchedAt);
talker.put(TALKER_ID, validateRate);
talker.put(TALKER_ID, editTalker);
talker.delete(TALKER_ID, validateToken);
talker.delete(TALKER_ID, removeTalker);

module.exports = talker;
