const express = require('express');
const bodyParser = require('body-parser');

const {
  talker,
  talkerId,
  validateEmail,
  validatePassword,
  generateToken,
  validateTalkerName,
  validateToken,
  validateTalkerAge,
  validateTalk,
  validateDate,
  validateRate,
  writeTalker,
} = require('./midllewares/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);

app.get('/talker/:id', talkerId);

app.post('/login', validateEmail, validatePassword, generateToken);

app.post('/talker',
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalk,
  validateDate,
  validateRate,
  writeTalker);

app.listen(PORT, () => {
  console.log('Online');
});