const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Special Thanks to Adelino Junior T10-A, who helped me to solve the problem with the GET '/talker' endpoint and its logics

const readFile = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkers);
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkerPerson = await readFile();
  if (talkerPerson.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).json(talkerPerson);
});

app.listen(PORT, () => {
  console.log('Online');
});
