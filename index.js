const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const talker = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const allTalkers = await fs.readFile(talker, 'utf-8')
  .catch(() => 'erro de leitura!');
  
  if (allTalkers && allTalkers.length === 0) return res.status(HTTP_OK_STATUS).send([]);

  res.status(HTTP_OK_STATUS).json(allTalkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
