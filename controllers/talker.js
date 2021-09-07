const express = require('express');
const fs = require('fs').promises;
const rescue = require('express-rescue');

const router = express.Router();

const getFile = async () => {
  const result = await fs.readFile('./talker.json');

  return JSON.parse(result);
};

router.get('/', rescue(async (_req, res) => {
  const talker = await getFile();
  if (!talker) return res.status(200).json([]);

  res.status(200).json(talker);
}));

module.exports = router; 