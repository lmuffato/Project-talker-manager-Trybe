const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const { readFile } = require('fs').promises;

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// 1. Crie o endpoint GET /talker

app.get('/talker', async (_req, res) => {
  try {
    const data = await readFile('./talker.json');
    const talkers = JSON.parse(data);
    res.status(200).json(talkers);
  } catch (e) {
    res.status(200).json([]);
  }
});
