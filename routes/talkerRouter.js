const express = require('express');
const fs = require('fs');

const path = './talker.json';

const prettier = require('prettier');

const router = express.Router();

const validateToken = require('../middleware/validateToken');
const validateName = require('../middleware/validateName');
const validateAge = require('../middleware/validateAge');
const {
  validateWatchedAt,
  validateRate,
  validateTalk,
} = require('../middleware/validateTalk');

router.get('/', async (request, response) => {
  const talkers = JSON.parse(await fs.promises.readFile(path, { encoding: 'utf-8' }));

  if (!talkers.length) {
    return response.status(200).json([]);
  }

  return response.status(200).json(talkers);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = JSON.parse(await fs.promises.readFile(path, { encoding: 'utf-8' }));

  const talkerById = await talkers.find((talker) => talker.id === Number(id));

  if (!talkerById) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return response.status(200).json(talkerById);
});

const validations = [
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
];

router.post('/', validations, async (request, response) => {
  const talkers = JSON.parse(await fs.promises.readFile(path, { encoding: 'utf-8' }));

  const newTalker = { id: talkers.length + 1, ...request.body };

  talkers.push(newTalker);

  const stringifyTalkers = JSON.stringify(talkers);
  const prettifyString = prettier.format(stringifyTalkers, { parser: 'json' });

  await fs.promises.writeFile('./talker.json', prettifyString, 'utf-8');

  return response.status(201).json(newTalker);
});

router.put('/:id', validations, validateRate, async (request, response) => {
  const { id } = request.params;
  const { name, age } = request.body;
  const { watchedAt, rate } = request.body.talk;
  const talkers = JSON.parse(await fs.promises.readFile(path, { encoding: 'utf-8' }));

  const getTalkerIndex = talkers.findIndex((t) => t.id === Number(id));
  const editedTalker = { id: Number(id), name, age, talk: { watchedAt, rate } };

  talkers[getTalkerIndex] = editedTalker;
  console.log(talkers);

  const stringifyTalkers = JSON.stringify(talkers);
  const prettifyString = prettier.format(stringifyTalkers, { parser: 'json' });

  await fs.promises.writeFile('./talker.json', prettifyString, 'utf-8');
  return response.status(200).json(talkers[getTalkerIndex]);
});

module.exports = router;
