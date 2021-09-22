const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const { 
  validateAge,
  validateDate,
  validateName,
  validateTalk,
  validateRate } = require('../middlewares/middlewaresTalker');
const { validateLogin } = require('../middlewares/middlewaresLogin');

const validateNewTalker = [
  validateLogin,
  validateName, 
  validateAge, 
  validateTalk, 
  validateDate, 
  validateRate, 
];

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
  res.status(200).json(talkers);
});

const setNewTalker = async (talker) => {
  await fs.writeFile('./talker.json', JSON.stringify(talker));
};

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getTalker = await getTalkerById(id);
  if (!getTalker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(getTalker);
});

router.post('/', validateNewTalker, async (req, res) => {
  const talkers = await getAll();
  const newTalker = { ...req.body, id: talkers.length + 1 };

  const updateTalkers = [...talkers, newTalker];
  await setNewTalker(updateTalkers);
  res.status(201).json(newTalker);
});

module.exports = router;
