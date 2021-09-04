const express = require('express');
const bodyParser = require('body-parser');

const talkerModel = require('./model/talkerModel');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', async (_req, res) => {
  const talkers = await talkerModel.getAllTalkers();
  res.status(200).json(talkers);
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerModel.getTalkerById(id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
