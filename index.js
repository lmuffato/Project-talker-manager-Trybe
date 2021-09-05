const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { generateToken } = require('./utils/functions');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, eh para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// requisito 1

app.get('/talker', async (_request, response) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talkers);
  response.status(200).json(result);
});

// requisito 2 

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talkers);
  const talkerId = result.find((talker) => talker.id === +id);
  if (!talkerId) response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  response.status(200).json(talkerId);
});

// requisito 3

  const EMPTY_EMAIL_ERROR = 'O campo "email" é obrigatório';
  const INVALID_EMAIL_ERROR = 'O "email" deve ter o formato "email@email.com"';
  const EMPTY_PASSWORD_ERROR = 'O campo "password" é obrigatório';
  const INVALID_PASSWORD_ERROR = 'O "password" deve ter pelo menos 6 caracteres';

  const emailValidation = (request, response, next) => {
    const { email } = request.body;
    const emailTesting = /[a-z]+@+[a-z]+\.+[a-z]/g.test(email);

    if (!email || email === '') return response.status(400).json({ message: EMPTY_EMAIL_ERROR });
    if (!emailTesting) return response.status(400).json({ message: INVALID_EMAIL_ERROR });

    next();
  };

  const passwordValidation = (request, response, next) => {
    const { password } = request.body;
    if (!password || password === '') {
      return response.status(400).json({ message: EMPTY_PASSWORD_ERROR });
    }
    if (password.length < 6) return response.status(400).json({ message: INVALID_PASSWORD_ERROR });
    next();
  };

app.post('/login', emailValidation, passwordValidation, (_request, response) => {
    response.status(200).json({ token: generateToken(16) });
});

// requisito 4

app.listen(PORT, () => {
  console.log('Online');
});
