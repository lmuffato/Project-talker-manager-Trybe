const express = require('express');
const bodyParser = require('body-parser');
const fileManager = require('./fileManager');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const readed = await fileManager.getAll()
  .catch(() => 'erro de leitura!');
  
  if (readed && readed.length === 0) return res.status(HTTP_OK_STATUS).send([]);

  res.status(HTTP_OK_STATUS).send(readed);
});

app.listen(PORT, () => {
  console.log('Online');
});
