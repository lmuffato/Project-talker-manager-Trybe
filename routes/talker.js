const express = require('express');

const fs = require('fs').promises;

const router = express.Router();
// const { token } = require('./login');

const {
  nameValidation,
  ageValidation,
  talkRateValidation,
  talkWatchedAtValidation,
  talkWatchedAtRegexValidation,
  tokenVerification,
  talkValidation,
} = require('../middleware');

const TALKER_FILE = 'talker.json';

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile(TALKER_FILE);

  if (talkers.length === 0 || !talkers) return res.status(200).json([]);
  res.status(200).json(JSON.parse(talkers));
});

router.get('/search',
tokenVerification,
async (req, res) => {
  const { q } = req.query;
  const talkers = JSON.parse(await fs.readFile(TALKER_FILE, 'utf8'));
  if (!q || q === '') return res.status(200).json(talkers);

  const talkersFilter = talkers.filter((t) => String(t.name).includes(q));
  res.status(200).json(talkersFilter);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(TALKER_FILE);
  const talker = JSON.parse(talkers).find((t) => t.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

router.post('/',
tokenVerification,
nameValidation,
ageValidation,
talkValidation,
talkWatchedAtValidation,
talkWatchedAtRegexValidation,
talkRateValidation,
async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  
  const talkers = JSON.parse(await fs.readFile(TALKER_FILE, 'utf8'));
  
  const talker = {
    id: talkers.length + 1,
    name,
    age: Number(age),
    talk: {
      watchedAt,
      rate: Number(rate),
    },
  };

  talkers.push(talker);

  await fs.writeFile(TALKER_FILE, JSON.stringify(talkers));
  res.status(201).json(talker);
});

router.put('/:id',
tokenVerification,
nameValidation,
ageValidation,
talkValidation,
talkWatchedAtValidation,
talkWatchedAtRegexValidation,
talkRateValidation,
async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile(TALKER_FILE, 'utf8'));
  const talkerIndex = talkers.findIndex((t) => t.id === Number(id));
  talkers[talkerIndex] = {
    id: Number(id),
    name,
    age: Number(age),
    talk: {
      watchedAt,
      rate: Number(rate),
    },
  };
  await fs.writeFile(TALKER_FILE, JSON.stringify(talkers));
  res.status(200).json(talkers[talkerIndex]);
});

router.delete('/:id',
tokenVerification,
async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile(TALKER_FILE, 'utf8'));
  const talkersNew = talkers.filter((t) => t.id !== Number(id));

  await fs.writeFile(TALKER_FILE, JSON.stringify(talkersNew));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

// router.put('/:id', function (req, res) {
//   const { id } = req.params;
//   const { name, price } = req.body;
//   const recipeIndex = recipes.findIndex((r) => r.id === parseInt(id));

//   if (recipeIndex === -1) return res.status(500).json({ message: 'Recipe not found!' });

//   recipes[recipeIndex] = { ...recipes[recipeIndex], name, price };

//   res.status(204).end();
// });

// router.delete('/:id', function (req, res) {
//   const { id } = req.params;
//   const recipeIndex = recipes.findIndex((r) => r.id === parseInt(id));

//   if (recipeIndex === -1) return res.status(500).json({ message: 'Recipe not found!' });

//   recipes.splice(recipeIndex, 1);

//   res.status(204).end();
// });

module.exports = router;