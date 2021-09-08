const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
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

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  if (!email || email === '') {
    res.status(BAD_REQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email)) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const passwordRegex = new RegExp(/[\w\D]{6}/g);

  if (!password || password === '') {
    console.log(password);
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (!passwordRegex.test(password)) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const randomtoken = Math.random().toString(36).substr(3);
  const token = randomtoken + randomtoken;

  if (token.length > 16) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O token não tem o tamanho ideal!' });
  }

  res.status(HTTP_OK_STATUS).json({ token });
  });

app.listen(PORT, () => {
  console.log('Online');
});
