const express = require('express');
const { readFile } = require('fs').promises;

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const data = await readFile('talker.json', 'utf-8');
    const talkers = JSON.parse(data);
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(200).json([]);
  }
});

module.exports = router;
