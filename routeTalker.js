const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const peopleRegister = () => fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));

router.get('/', async (_req, res) => {
  const talkers = await peopleRegister();
  if (!talkers) return res.status(200).json([]);
  res.status(200).json(talkers);
});

module.exports = router;