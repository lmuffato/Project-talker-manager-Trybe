const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
const { nextTick } = require('process');

const readFile = async () => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  const dataTalkers = JSON.parse(file);
  return dataTalkers;
};

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const HTTP_ERROR_STATUS = 400;
const PORT = '3000';

const messageNotFound = {
  message: 'Pessoa palestrante não encontrada',
};
const messageEmailRequired = {
  message: 'O campo "email" é obrigatório',
};
const messageEmailFormat = {
  message: 'O "email" deve ter o formato "email@email.com"',
};
const messagePassRequired = {
  message: 'O campo "password" é obrigatório',
};
const messagePassFormat = {
  message: 'O "password" deve ter pelo menos 6 caracteres',
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 1
app.get('/talker', async (_req, res) => {
  const dataTalkers = await readFile();
  if (dataTalkers.length > 0) return res.status(HTTP_OK_STATUS).json(dataTalkers);
  return res.status(HTTP_OK_STATUS).json([]);
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
  const dataTalkers = await readFile();

  const dataTalkerFiltered = dataTalkers.find((talker) => talker.id === +id);

  if (dataTalkerFiltered) return res.status(HTTP_OK_STATUS).json(dataTalkerFiltered);
  throw Error();
  } catch (error) {
    return res.status(HTTP_NOTFOUND_STATUS).json(messageNotFound);
  }
});

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) return res.status(HTTP_ERROR_STATUS).json(messageEmailRequired);
  if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)) {
    return res.status(HTTP_ERROR_STATUS).json(messageEmailFormat);
  }
  next();
}

function validatePass(req, res, next) {
  const { password } = req.body;
  if (!password) return res.status(HTTP_ERROR_STATUS).json(messagePassRequired);
  if (password.length < 6) return res.status(HTTP_ERROR_STATUS).json(messagePassFormat);
  next();
}

function generateToken() {
  return Math.random().toString(16).substr(8) + Math.random().toString(16).substr(6);
}

function generateAuth(req, res) {
  const auth = generateToken();
  if (auth.length === 16) {
    const token = { token: auth };
    return res.status(HTTP_OK_STATUS).json(token);
  }
    const secondAuth = generateToken();
    const token = { token: secondAuth };
    return res.status(HTTP_OK_STATUS).json(token);
}

// Requisito 3
app.post('/login', validateEmail, validatePass, generateAuth);
