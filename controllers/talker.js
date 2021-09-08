const express = require('express');
const fs = require('fs').promises;
const rescue = require('express-rescue');
const {
  validateToken,
  validateTalk,
  validateRate,
  validateName,
  validateDate,
  validateAge,
} = require('../middlewares/talkerMiddlewares');

const router = express.Router();

const getFile = async () => {
  const result = await fs.readFile('./talker.json');

  return JSON.parse(result);
};

const setFile = async (talkers) => {
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
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

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  rescue(async (req, res) => {
    const { name, age, talk } = req.body;
    // const { watchedAt, rate } = talk;

    const talkers = await getFile();
    const newTalker = { id: talkers.length + 1, name, age, talk };
    const newTalkers = [...talkers, newTalker];
    await setFile(newTalkers);

    res.status(201).json(newTalker);
  }),
);

module.exports = router; 