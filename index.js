const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const FILE_NAME = './talker.json';
const readFileAsync = require('./readFile');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await readFileAsync(FILE_NAME);
  if (!data) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).send(JSON.parse(data));
});

app.listen(PORT, () => {
  console.log('Online');
});
