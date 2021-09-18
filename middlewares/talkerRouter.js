const express = require('express');
const fs = require('fs').promises;
const http = require('../helper/httpStatus');
const tokenAuth = require('./validateToken');
const talkerAuth = require('./validateTalker');

const router = express.Router();

const { validateAge,
  validateName,
  validateRate,
  validateTalk,
  validateWatchedAt,
} = talkerAuth;
const { 
  validateToken,
} = tokenAuth;

const readFile = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkers);
};

const writeFile = (content) => fs.writeFile('./talker.json', JSON.stringify(content));

router.get('/', async (_req, res) => {
  const talkers = await readFile();
  if (talkers.length === 0) {
    return res.status(http.OK_STATUS).json([]);
  }
  res.status(http.OK_STATUS).json(talkers);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await readFile();
  const filteredTalkers = talkers.filter((t) => t.name.includes(q));

  if (!q) {
    return res.status(http.OK_STATUS).json(talkers);
  }

  if (!filteredTalkers) {
    return res.status(http.OK_STATUS).json([]);
  }

  res.status(http.OK_STATUS).json(filteredTalkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!talker) {
    return res.status(http.NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(http.OK_STATUS).json(talker);
});

router.use(validateToken);

router.post('/',
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readFile();
  const id = talkers.length + 1;

  talkers.push({ name, age, id, talk });
  writeFile(talkers);
  res.status(http.CREATED).json({ name, age, id, talk });
});

router.put('/:id',
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const intId = parseInt(id, 10);
  const talkers = await readFile();
  const index = id - 1;

  talkers[index].name = name;
  talkers[index].age = age;
  talkers[index].talk = talk;
  
  writeFile(talkers);
  res.status(http.OK_STATUS).json({ name, age, id: intId, talk });
});

router.delete('/:id',
async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const filteredTalkers = talkers.find((t) => t.id !== parseInt(id, 10));
  
  writeFile(filteredTalkers);
  res.status(http.OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
