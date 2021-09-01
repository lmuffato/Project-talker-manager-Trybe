const express = require('express');

const router = express.Router();

const readContentFile = require('../utils/readContentFile');

const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;

const PATH = './talker.json';

router.get('/', async (_req, res) => {
  const talkers = await readContentFile(PATH) || [];
  res.status(HTTP_OK).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH);

  const talkerFilteredById = talkers.find((talker) => talker.id === +id);

  if (!talkerFilteredById) {
    return res
    .status(HTTP_NOT_FOUND)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(HTTP_OK).json(talkerFilteredById);
});

module.exports = router;
