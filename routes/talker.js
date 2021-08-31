const express = require('express');
const readFile = require('../utils/readFile');
const status = require('../status');

const router = express.Router();

const TALKERS = readFile('talker.json');

router.get('/', (_req, res) => {
  const hasTalkers = TALKERS || TALKERS.length > 0;

  if (!hasTalkers) return res.status(status.ok).json([]);

  res.status(status.ok).json(TALKERS);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundTalker = TALKERS.find((t) => t.id === parseInt(id, 10));

  if (!foundTalker) {
    return res
    .status(status.notFound)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(status.ok).json(foundTalker);
});

module.exports = router;
