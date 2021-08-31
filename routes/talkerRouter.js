const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

console.log(__dirname);
const readTalkers = async () => {
  const data = await fs.readFile(`${__dirname}/../talker.json`, 'utf-8');
  return JSON.parse(data);
};

router.get('/', async (_req, res) => {
  const talkers = await readTalkers();
  res.status(200).json(talkers);
});

module.exports = router;
