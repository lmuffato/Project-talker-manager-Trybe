const fs = require('fs');
const express = require('express');

const talker = 'talker.json';
const dataTalker = JSON.parse(fs.readFileSync(talker, 'utf-8'));
const router = express.Router();
const HTTP_OK_STATUS = 200;

// requisito 1
router.get('/', (_request, response) => {
  if (dataTalker.length === 0) return response.status(HTTP_OK_STATUS).json([]);
  return response.status(HTTP_OK_STATUS).json(dataTalker);
});

module.exports = router;
