const express = require('express');
const bodyParser = require('body-parser');
const getTalkers = require('./middlewares/getTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const { postToken, validateEmail, validatePassword } = require('./middlewares/login');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./middlewares/validations');
const addTalker = require('./middlewares/postTalker');
const editTalker = require('./middlewares/putTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkers);
app.get('/talker/:id', getTalkerById);
app.post('/login', validateEmail, validatePassword, postToken);
app.post('/talker',
validateToken,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
addTalker);
app.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateRate,
validateWatchedAt,
editTalker);

app.listen(PORT, () => {
  console.log('Online');
});
