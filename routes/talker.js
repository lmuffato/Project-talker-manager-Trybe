const express = require('express');
const readFile = require('../utils/readFile');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const TALKERS = readFile('talker.json');

router.get('/', (_req, res) => {
  const hasTalkers = TALKERS || TALKERS.length > 0;

  if (!hasTalkers) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(TALKERS);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundTalker = TALKERS.find((t) => t.id === parseInt(id, 10));

  if (!foundTalker) {
    return res
    .status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(HTTP_OK_STATUS).json(foundTalker);
});

module.exports = router;
