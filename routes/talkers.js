const express = require('express');
// const fs = require('fs').promises;
const { getAllTalkers } = require('../readData');
const { HTTP_OK_STATUS } = require('../utils/httpStatus');
// const TALKERS_LIST = require('../talker.json');
const getTalkerById = require('../utils/getTalkerById');
const addNewTalker = require('../utils/addNewTalker');
const validateTalk = require('../utils/validateTalk');
const validateAge = require('../utils/validateAge');
const validateName = require('../utils/validateName');
const validateToken = require('../utils/validateToken');
const validateDate = require('../utils/validateDate');
const validateRate = require('../utils/validateRate');
const validateDateTwice = require('../utils/validateDateII');
const editTalker = require('../utils/editTalker');
const removeTalker = require('../utils/removeTalker');
const searchTalker = require('../utils/searchTalker');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateDateTwice,
  validateRate,
  addNewTalker);

router.get('/search',
validateToken,
searchTalker);

router.get('/:id', getTalkerById);

router.put('/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateDateTwice,
  validateRate,
  editTalker);

router.delete('/:id',
  validateToken,
  removeTalker);

module.exports = router;
