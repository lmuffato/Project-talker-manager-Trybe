const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { randToken } = require('./utils/funtions');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const ERROR_404 = 'Pessoa palestrante não encontrada';
const ERROR_EMAIL_VAZIO = 'O campo "email" é obrigatório';
const ERROR_EMAIL_INVALID = 'O "email" deve ter o formato "email@email.com"';
const ERROR_PASSWORD_VAZIO = 'O campo "password" é obrigatório';
const ERROR_PASSWORD_INVALID = 'O "password" deve ter pelo menos 6 caracteres"';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 1
app.get('/talker', async (_req, res) => {
  try {
    const request = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
    res.status(200).json(request);
  } catch (_err) {
    res.status(200).json([]);
  }
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const request = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
  const findTalker = request.find((e) => e.id === Number(id));

  if (!findTalker) return res.status(404).json({ message: ERROR_404 });

  res.status(200).json(findTalker);
});

const validadeEmail = (req, res, next) => {
  const { email } = req.body;
  const emailValidator = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(email);

  if (!email || email === '') return res.status(400).json({ message: ERROR_EMAIL_VAZIO });
  if (!emailValidator) return res.status(400).json({ message: ERROR_EMAIL_INVALID });

  next();
};

const validadePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') return res.status(400).json({ message: ERROR_PASSWORD_VAZIO });
  if (password.length < 5) return res.status(400).json({ message: ERROR_PASSWORD_INVALID });

  next();
};

// Requisito 3
app.post('/login', validadeEmail, validadePassword, (_req, res) => {
  const token = randToken(16);

  res.status(200).json({ token });
});

// Requisito 4
