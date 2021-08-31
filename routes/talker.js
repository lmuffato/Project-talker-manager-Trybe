const express = require('express');
const readFile = require('../utils/readFile');

const router = express.Router();

const HTTP_OK_STATUS = 200;

router.get('/', (_req, res) => {
  const talkers = readFile('talker.json');
  const hasTalkers = talkers || talkers.length > 0;

  if (!hasTalkers) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(talkers);
});

module.exports = router;
