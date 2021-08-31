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
  .then((content) => response.status(200).send(JSON.parse(content)))
  .catch((err) => response.status(200)
  .json({ message: `Erro ao buscar arquivo ${err.message}` }));
});

app.listen(PORT, () => {
  console.log('Online');
});
