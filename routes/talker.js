const express = require('express');
const readFile = require('../utils/readFile');
const status = require('../status');

const router = express.Router();

router.route('/')
.get((_req, res) => {
  const hasTalkers = talkers || talkers.length > 0;
  const talkers = readFile('talker.json');

    if (!hasTalkers) return res.status(status.ok).json([]);

    res.status(status.ok).json(talkers);
  })
  .post((req, res) => {

  });

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundTalker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!foundTalker) {
    return res
    .status(status.notFound)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(status.ok).json(foundTalker);
});

module.exports = router;
