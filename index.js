const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const talker = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const dataTalker = await fs.readFile(talker, 'utf8');
  res.status(HTTP_OK_STATUS).json(JSON.parse(dataTalker));
});

app.listen(PORT, () => {
  console.log('Online');
});
