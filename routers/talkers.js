const express = require('express');
const myModule = require('../modules');
const middleware = require('../middlewares');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 404;
const FILE_NAME = './talker.json';

const talkers = express.Router();

talkers.get('', async (_req, res) => {
  const data = await myModule.readFileAsync(FILE_NAME);
  if (!data) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).send(data);
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

talkers.post('', ...middleware, async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await myModule.readFileAsync(FILE_NAME);
  const newTalk = {
    id: data.length + 1,
    name,
    age,
    talk,
  };
  data.push(newTalk);
  console.log(data);
  await myModule.writeFileAsync(FILE_NAME, JSON.stringify(data));
  res.status(201).json(newTalk); 
});

module.exports = talkers;
