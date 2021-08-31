const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

const { readFile } = require('../services/readFile');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readFile();
  if (talkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(talkers);
});

module.exports = {
  app,
};
