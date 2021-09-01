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

  console.log(talkerContent);

  return res.status(HTTP_OK_STATUS).json(talkerContent);
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

  setNewTalker(newTalker);

  res.status(HTTP_CREATED_STATUS)
    .json(newTalker);
}));

module.exports = router;
