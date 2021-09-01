const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const arrayPeople = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkers = async () => fs.readFile(arrayPeople, 'utf-8').then((data) => JSON.parse(data));

// Requisito 1 - Crie o endpoint GET /talker

app.get('/talker', async (_req, res) => {
  const arrayToSend = await getTalkers();

  // if (!arrayToSend) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(arrayToSend);
});

// ----------------------------------------

// Requisito 2 - Crie o endpoint GET /talker/:id

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkersArray = await getTalkers();
  const filterTalker = talkersArray.find((talker) => talker.id === Number(id));

  if (!filterTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(filterTalker);
});

// ----------------------------------------

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
