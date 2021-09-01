const express = require('express');

const router = express.Router();

const readContentFile = require('../utils/readContentFile');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

const PATH = './talker.json';

router.get('/', async (_req, res) => {
  const content = await readContentFile(PATH) || [];
  res.status(HTTP_OK_STATUS).json(content);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH);

  const talkerFilteredById = talkers.find((talker) => talker.id === +id);

  if (!talkerFilteredById) {
    return res
    .status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(HTTP_OK_STATUS).json(talkerFilteredById);
});

module.exports = router;
