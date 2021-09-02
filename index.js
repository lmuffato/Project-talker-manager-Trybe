const express = require('express');
const bodyParser = require('body-parser');

const showTalkers = require('./middlewares/showTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const login = require('./middlewares/login');
const validateToken = require('./middlewares/validateToken');
const { validateName, validateAge, validateTalk,
   validateTalkDate, validateTalkRate } = require('./middlewares/validateTalker');
const createTalker = require('./middlewares/createTalker');
const editTalker = require('./middlewares/editTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', getTalkerById);

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkDate,
  validateTalkRate,
  editTalker);

app.get('/talker', showTalkers);

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkDate,
  validateTalkRate,
  createTalker);

app.post('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
