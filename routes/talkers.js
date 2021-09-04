const express = require('express');

const getAllTalkers = require('../utils/getAllTalkers');
const { HTTP_OK_STATUS } = require('../utils/httpStatus');
const getTalkerById = require('../utils/getTalkerById');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/:id', getTalkerById);

router.post('/', async () => {});

module.exports = router;
