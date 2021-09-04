const express = require('express');
const fs = require('fs').promises;
const getAllTalkers = require('../utils/getAllTalkers');
const { HTTP_OK_STATUS, HTTP_CREATE_STATUS } = require('../utils/httpStatus');
const TALKERS_LIST = require('../talker.json');
const getTalkerById = require('../utils/getTalkerById');
// const addNewTalker = require('../utils/addNewTalker');
const validateTalk = require('../utils/validateTalk');
const validateAge = require('../utils/validateAge');
const validateName = require('../utils/validateName');
const validateToken = require('../utils/validateToken');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/:id', getTalkerById);

const validations = [validateAge, validateTalk, validateName, validateToken];

router.post('/', validations, async (req, res) => {
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
});

module.exports = router;
