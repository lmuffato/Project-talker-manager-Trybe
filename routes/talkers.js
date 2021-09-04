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

const router = express.Router();

router.get('/:id', getTalkerById);

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

module.exports = router;
