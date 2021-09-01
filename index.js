const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;

const readFile = async () => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  const dataTalkers = JSON.parse(file);
  return dataTalkers;
};

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talkers', async (_req, res) => {
  const dataTalkers = await readFile();
  if (dataTalkers.length > 0) return res.status(HTTP_OK_STATUS).json(dataTalkers);
  return res.status(HTTP_OK_STATUS).json([]);
});
