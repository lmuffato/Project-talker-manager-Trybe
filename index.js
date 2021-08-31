const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  fs.readFile('./talker.json', 'utf8')
  .then((content) => response.status(HTTP_OK_STATUS).send(JSON.parse(content)))
  .catch(() => response.status(401).json([]));
});

app.get('/talker/:id', (_request, response) => {
 const { id } = _request.params;
 fs.readFile('./talker.json', 'utf8').then((talkers) => {
 const talkerjson = JSON.parse(talkers);
 const res = talkerjson.find((talkerId) => talkerId.id === parseInt(id, 10));
if (!res) return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
return response.status(HTTP_OK_STATUS).json(res);
});
});

app.listen(PORT, () => {
  console.log('Online');
});
