const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';
const HTTP_BAD_REQUEST = 400;

function verificaEmail(email) {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return emailRegex.test(email);
}

function geraToken() {
  return crypto.randomBytes(8)
 .toString('hex');
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', (_request, response) => {
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  try {
    response.status(HTTP_OK_STATUS).json(data);
  } catch (error) {
    response.status(HTTP_OK_STATUS).json([]);
  }

/*   if (data === []) {
    response.status(HTTP_OK_STATUS).json([]);
  }response.status(HTTP_OK_STATUS).json(data); */
});

// Requisito 2

app.get('/talker/:id', (request, response) => {
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const { id } = request.params;
  const talkerId = data.find((talker) => talker.id === Number(id));
   const messageError = { message: 'Pessoa palestrante não encontrada' };
  
  return talkerId
  ? response.status(HTTP_OK_STATUS).json(talkerId)
  : response.status(HTTP_NOT_FOUND).json(messageError);
});

// Requisito 3
app.post('/login', (request, response) => {
  const token = geraToken();
  const { email, password } = request.body;
  if (email === undefined) {
    return response.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (verificaEmail(email) === false) {
   return response.status(HTTP_BAD_REQUEST)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password === undefined) {
   return response.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) {
   return response.status(HTTP_BAD_REQUEST)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
 return response.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});