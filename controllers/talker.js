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

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getFile();
  const talker = talkers.find((talk) => talk.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
}));

module.exports = router; 