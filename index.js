const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promisses;

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
  .catch((err) => response.status(401)
  .json({ message: `Erro ao buscar arquivo ${err.message}` }));
});

app.get('/talker/:id', (_request, response) => {
 const { id } = _request.params;
 fs.readFile('./talker.json', 'utf8').then((talkers) => {
 const res = talkers.find((talkerId) => talkerId.id === parseInt(id, 10));
if (!res) return response.status(404).json({ message: 'Pessoa palestrante nao encontrada' });
return response.status(HTTP_OK_STATUS).json(res);
});
});

app.listen(PORT, () => {
  console.log('Online');
});
