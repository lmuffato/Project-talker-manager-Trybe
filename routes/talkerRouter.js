const express = require('express');

const router = express.Router();

const { readFileSync } = require('../middleware/readFile');

router.get('/', async (request, response) => {
  const talkers = await readFileSync('./talker.json');

  if (!talkers.length) {
    return response.status(200).json([]);
  }

  return response.status(200).json(talkers);
});

module.exports = router;
