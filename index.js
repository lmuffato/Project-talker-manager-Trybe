const fs = require('fs').promises;
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

app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json')
    .then((result) => res.status(200).json(JSON.parse(result)))
    .catch((err) => res.status(404).json({ message: err.message }));
});

app.get('/talker/:id', (req, res) => {
  fs.readFile('./talker.json')
    .then((result) => JSON.parse(result))
    .then((result) => result.filter((entry) => entry.id === +req.params.id))
    .then((result) => {
      if (result.length > 0) {
        res.status(200).send(result[0]);
      } else {
        throw new Error('Pessoa palestrante não encontrada');
      }
    })
    .catch((err) => res.status(404).json({ message: err.message }));
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
