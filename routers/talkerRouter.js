const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const STATUS_OK = 200;
const NOT_FOUND = 404;

const getAll = async () => {
  const allTalkers = await fs.readFile('./talker.json', 'utf-8');
  if (allTalkers && allTalkers.length === 0) return JSON.parse([]);

  return JSON.parse(allTalkers);
};

const getTalkerById = async (id) => {
  const allTalkers = await getAll();
  const talkerById = allTalkers.find((t) => t.id === parseInt(id, Number));
  return talkerById; 
};

router.get('/', async (_req, res) => {
  const talkers = await getAll();
  res.status(STATUS_OK).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getTalker = await getTalkerById(id);
  if (!getTalker) res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(STATUS_OK).json(getTalker);
});

module.exports = router;
