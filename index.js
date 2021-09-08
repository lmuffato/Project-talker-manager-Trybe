const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const talkerData = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

  if (talkerData.length === 0) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(talkerData);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;

  const talkerData = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const dataPerson = talkerData.find((person) => person.id === parseInt(id, 10));

  if (dataPerson === undefined) {
    return res.status(NOT_FOUND)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(dataPerson);
});

app.listen(PORT, () => {
  console.log('Online');
});
