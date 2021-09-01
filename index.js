const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const arrayPeople = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 1 - Crie o endpoint GET /talker

app.get('/talker', async (_req, res) => {
  const arrayToSend = await fs.readFile(arrayPeople, 'utf-8').then((data) => JSON.parse(data));

  // if (!arrayToSend) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(arrayToSend);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
