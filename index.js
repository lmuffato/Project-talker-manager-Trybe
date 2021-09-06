const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const readFileTalker = require('./Routes/talkerRouter');
const talkerByID = require('./Routes/talkerRouter');
const loginRouter = require('./Routes/loginRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, eh para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// requisito 1

app.use('/talker', readFileTalker);

// requisito 2 

app.use('/talker/:id', talkerByID);

// requisito 3

app.use('/login', loginRouter);

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
  if (!rate || rate === '') return response.status(400).json({ message: TALK_ERROR });
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
talkRateValidation,
async (request, response) => {
  const { name, age, talk: { watchedAt, rate } } = request.body;
  const talkers = await fs.readFile('./talker.json');
  const talker = await JSON.parse(talkers);
  const newTalker = {
  id: (talker.length + 1),
  name,
  age,
  talk: { watchedAt, rate } };
  talker.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talker));
  response.status(201).json(newTalker);
});

  // requisito 5

  const rateValidation = (request, response, next) => {
    const { talk } = request.body;
    const { rate } = talk;
    if (rate < 1) return response.status(400).json({ message: RATE_ERROR });
    if (rate > 5) return response.status(400).json({ message: RATE_ERROR });
    next();
  };

app.put('/talker/:id',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
talkWatchedAtValidation,
rateValidation,
async (request, response) => {
  const { id } = request.params;
  const { name, age, talk: { watchedAt, rate } } = request.body;
  const talkersFile = await fs.readFile('./talker.json');
  const talkers = await JSON.parse(talkersFile);
  const otherNewTalker = talkers.filter((talker) => talker.id === id);
  const editTalker = {
    id: +id,
    name,
    age,
    talk: { watchedAt, rate },
  };
  otherNewTalker.push(editTalker);
  await fs.writeFile('./talker.json', otherNewTalker);
  response.status(HTTP_OK_STATUS).json(editTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
