const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
// const talker = require('../talker.json');

const STATUS_OK = 200;

const getAll = async () => {
  const allTalkers = await fs.readFile('./talker.json', 'utf-8');
  if (allTalkers && allTalkers.length === 0) return JSON.parse([]);

  return JSON.parse(allTalkers);
};

router.get('/', async (_req, res) => {
  const talkers = await getAll();
  res.status(STATUS_OK).json(talkers);
});

router.get('/:id', async (req, res) => {});

module.exports = router;
