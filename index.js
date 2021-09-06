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
const TOKEN_NOT_FOUND_ERROR = 'Token não encontrado';
const INVALID_TOKEN_ERROR = 'Token inválido';
const NAME_REQUIRED_ERROR = 'O campo "name" é obrigatório';
const NAME_LENGTH_ERROR = 'O "name" deve ter pelo menos 3 caracteres';
const AGE_REQUIRED_ERROR = 'O campo "age" é obrigatório';
const MINIMUN_AGE_ERROR = 'A pessoa palestrante deve ser maior de idade';
const TALK_ERROR = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const RATE_ERROR = 'O campo "rate" deve ser um inteiro de 1 à 5';
const FORMAT_WATCHEDAT_ERROR = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

const tokenValidation = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({ message: TOKEN_NOT_FOUND_ERROR });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({ message: INVALID_TOKEN_ERROR });
  }
  next();
};

const nameValidation = (request, response, next) => {
  const { name } = request.body;
  if (!name) return response.status(400).json({ message: NAME_REQUIRED_ERROR });
  if (name.length < 3) return response.status(400).json({ message: NAME_LENGTH_ERROR });
  next();
};

const ageValidation = (request, response, next) => {
  const { age } = request.body;
  if (!age) return response.status(400).json({ message: AGE_REQUIRED_ERROR });
  if (age < 18) return response.status(400).json({ message: MINIMUN_AGE_ERROR });
  next();
};

const talkValidation = (request, response, next) => {
  const { talk } = request.body;
  if (!talk) return response.status(400).json({ message: TALK_ERROR });
  next();
};

const talkWatchedAtValidation = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt } = talk;
  const watchedAtTest = /\d\d\/\d\d\/\d\d\d\d/g.test(watchedAt);
  if (!watchedAt) return response.status(400).json({ message: TALK_ERROR });
  if (!watchedAtTest) {
    return response.status(400).json({ message: FORMAT_WATCHEDAT_ERROR });
  }
  next();
};

const talkRateValidation = (request, response, next) => {
  const { talk } = request.body;
  const { rate } = talk;
  if (!rate) return response.status(400).json({ message: TALK_ERROR });
  if (rate < 1 || rate > 5) {
    return response.status(400).json({ message: RATE_ERROR });
  }
  next();
};

app.post('/talker',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
talkWatchedAtValidation,
talkRateValidation, async (request, response) => {
  const { name, age, talk: { watchedAt, rate } } = request.body;
  const talkers = await fs.readFile('./talker.json');
  const talker = JSON.parse(talkers);
  const newTalker = {
  id: (talker.length + 1),
  name,
  age,
  talk: { watchedAt, rate } };
  talker.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talker));
  response.status(201).json(newTalker);
});
  //

app.listen(PORT, () => {
  console.log('Online');
});
