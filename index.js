const express = require('express');
const bodyParser = require('body-parser');

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

const fs = require('fs').promises;

const talkers = 'talker.json';

app.get('/talker', (_req, res) => {
  res.status(200).json(
    fs.readFile(talkers, 'utf-8')
    .then((data) => data)
    .catch((err) => console.log(`Não foi possível ler o arquivo ${talkers}, /n Erro: ${err}`)),
  );
});
