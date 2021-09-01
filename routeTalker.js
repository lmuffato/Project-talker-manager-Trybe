const express = require('express');
const fs = require('fs').promises;
const ultility = require('./middlewares');
const createTalker = require('./createTalker');

const router = express.Router({
  mergeParams: true,
});

const peopleRegister = () => fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));

router.get('/', async (_req, res) => {
  const talkers = await peopleRegister();
  if (!talkers) return res.status(200).json([]);
  res.status(200).json(talkers);
});

router.post('/', ultility, createTalker);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await peopleRegister();
  const filterId = talkers.find((r) => r.id === parseInt(id, 10));
  if (!filterId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(filterId);
});

module.exports = router;