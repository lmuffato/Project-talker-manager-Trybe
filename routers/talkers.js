const express = require('express');
const myModule = require('../modules');

const talkers = express.Router();
const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 404;
const FILE_NAME = './talker.json';

talkers.get('', async (req, res) => {
  const data = await myModule.readFileAsync(FILE_NAME);
  if (!data) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).send(JSON.parse(data));
});

talkers.get('/:id', async (req, res) => {
  const data = await myModule.readFileAsync(FILE_NAME);
  const talkersId = await Number(req.params.id);
  const getTalker = await JSON.parse(data).find((talker) => talker.id === talkersId);

  if (!getTalker) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).send(getTalker);
});

module.exports = talkers;
