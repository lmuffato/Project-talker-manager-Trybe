const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const talkers = require('./talker.json');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', (req, res) => {
  if (!talkers || talkers === []) return res.status(200).json([]);

  res.status(200).json(talkers);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const myTalker = talkers.find((t) => t.id === parseInt(id));
  if (!myTalker) return res.status(404).json({ "message": "Pessoa palestrante não encontrada" });
  res.status(200).json(myTalker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
});
