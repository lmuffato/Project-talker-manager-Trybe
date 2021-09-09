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

router.get('/search', validateToken, rescue(async (req, res) => {
  const { q: query } = req.query;

  const talkers = await getFile();
  if (!query || query === '') return res.status(200).json(talkers);

  const filteredTalkers = talkers.filter((talker) => talker.name.includes(query));
  if (!filteredTalkers) return res.status(200).json([]);

  res.status(200).json(filteredTalkers);
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

router.put(
  '/:id', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    const talkers = await getFile();
    const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
    talkers[talkerIndex] = { ...talkers[talkerIndex], id: parseInt(id, 10), name, age, talk };
    await setFile(talkers);
    res.status(200).json({ id: parseInt(id, 10), name, age, talk });
  }),
);

router.delete('/:id', validateToken, rescue(async (req, res) => {
  const { id } = req.params;

  const talkers = await getFile();
  const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  talkers.splice(talkerIndex, 1);
  await setFile(talkers);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

module.exports = router; 