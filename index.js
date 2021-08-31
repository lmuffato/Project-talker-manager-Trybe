const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const getTalkersList = require('./getTalkersList');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const tokenLength = 16;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkersList);

app.get('/talker/:id', async (req, res) => {
  const content = await fs.readFile('./talker.json');
  const talkers = JSON.parse(content);
  const { id } = req.params;
  const talker = talkers.find((t) => t.id === parseInt(id.substring(id.length - 1), 10));
  // https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

app.post('/login',
(req, res, next) => {
  const { authorization } = req.headers;
  if (authorization.length < tokenLength) return res.status(400).json({ message: 'Invalid token' });
  res.status(200);
  next();
},
(req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.match(emailPattern)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
},
(req, res) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
});

app.use((err, _req, res, _next) => {
  console.log('Passou pelo middleware');
  res.status(400).json({ message: err });
});

app.listen(PORT, () => {
  console.log('Online');
});
