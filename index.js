const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

app.get('/talker', (_req, res) => {
  if (talkers === '' || talkers.length === 0) return res.status(200).json([]);

  res.status(200).json(talkers);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
