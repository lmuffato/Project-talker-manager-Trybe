const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const rescue = require('express-rescue');

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;

const {
  getTalkerFile,
} = require('../fsFunctions');

const {
  validateToken,
  validateName,
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

const talkerMiddlewares = [validateToken, validateName];

router.post('/', talkerMiddlewares);

module.exports = router;
