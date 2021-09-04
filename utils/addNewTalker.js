const fs = require('fs').promises;
const getAllTalkers = require('./getAllTalkers');
const TALKERS_LIST = require('../talker.json');
const { HTTP_CREATE_STATUS } = require('./httpStatus');

const validateTalk = require('./validateTalk');
const validateAge = require('./validateAge');
const validateName = require('./validateName');
const validateToken = require('./validateToken');

const addNewTalker = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = getAllTalkers();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age: parseInt(age, 10),
    talk: {
      watchedAt,
      rate: parseInt(rate, 10),
    },
  };
  const addingNewTalker = talkers.push(newTalker);
  await fs.writeFile(TALKERS_LIST, JSON.stringify(addingNewTalker));
  return res.status(HTTP_CREATE_STATUS).json(newTalker);
};

module.exports = addNewTalker;
