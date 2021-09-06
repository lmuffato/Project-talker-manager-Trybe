const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const readFileTalker = require('./Routes/talkerRouter');
const talkerByID = require('./Routes/talkerRouter');
const loginRouter = require('./Routes/loginRouter');
const talkerValidations = require('./Routes/talkerRouter');

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

const TALK_ERROR = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const RATE_ERROR = 'O campo "rate" deve ser um inteiro de 1 à 5';
const FORMAT_WATCHEDAT_ERROR = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

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

app.use('/talker',
talkerValidations,
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

app.use('/talker/:id',
talkerValidations,
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
