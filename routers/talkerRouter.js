const express = require('express');

const router = express.Router();

const readContentFile = require('../utils/readContentFile');

const HTTP_OK_STATUS = 200;

const pathFile = './talker.json';

router.get('/', async (_req, res) => {
  const content = await readContentFile(pathFile) || [];
  res.status(HTTP_OK_STATUS).json(content);
});

module.exports = router;
