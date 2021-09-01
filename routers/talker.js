const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const rescue = require('express-rescue');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOTFOUND_STATUS = 404;

const {
  getTalkerFile,
  setNewTalker,
  setUpdate,
} = require('../fsFunctions');

const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkDate,
  validateTalkRate,
} = require('../middlewares/talkerMiddlewares');

router.get('/', rescue(async (_req, res) => {
  const talkerFile = await fs.readFile('talker.json', 'utf-8');
  const talkerContent = talkerFile ? JSON.parse(talkerFile) : [];

  return res.status(HTTP_OK_STATUS).json(talkerContent);
}));

router.get('/search', validateToken, rescue(async (req, res) => {
  const talkers = await getTalkerFile();
  const { q } = req.query;

  if (!q) res.status(HTTP_OK_STATUS).json(talkers);

  const selectedTalkers = talkers.filter(({ name }) => name.includes(q));

  res.status(HTTP_OK_STATUS).json(selectedTalkers);
}));

router.get('/:id', rescue(async (req, res) => {
  const talkers = await getTalkerFile();
  const talkerById = talkers.find(({ id }) => id === parseFloat(req.params.id));

  return !talkerById 
    ? res.status(HTTP_NOTFOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' })
    : res.status(HTTP_OK_STATUS).json(talkerById);
}));

const talkerMiddlewares = [
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkDate,
  validateTalkRate,
];

router.post('/', talkerMiddlewares, rescue(async (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = await getTalkerFile();
  
  const lastTalker = talkers.length + 1;
  
  const newTalker = {
    id: lastTalker,
    name,
    age,
    talk,
  };

  talkers.push(newTalker);
  setNewTalker(talkers);
  
  res.status(HTTP_CREATED_STATUS)
  .json(newTalker);
}));

router.put('/:id', talkerMiddlewares, rescue(async (req, res) => {
  const { id } = req.params;

  const talkers = await getTalkerFile();
  const { name, age, talk } = req.body;
  let talkerIndex;
  if (talkers.length > 0) {
    talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  }
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
  await setUpdate(talkers);
  res.status(HTTP_OK_STATUS)
  .json({
    id: parseFloat(id),
    name,
    age,
    talk,
  });
}));

router.delete('/:id', validateToken, rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkerFile();
  let talkerIndex;

  if (talkers.length > 0) {
    talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  }

  talkers.splice(talkerIndex, 1);

  setUpdate(talkers);

  res.status(HTTP_OK_STATUS)
    .json({ message: 'Pessoa palestrante deletada com sucesso' });
}));

module.exports = router;
