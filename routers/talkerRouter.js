const express = require('express');

const router = express.Router();

const readContentFile = require('../utils/readContentFile');

const HTTP_OK_STATUS = 200;

const PATH = './talker.json';

router.get('/', async (_req, res) => {
  const content = await readContentFile(PATH) || [];
  res.status(HTTP_OK_STATUS).json(content);
});

module.exports = router;
