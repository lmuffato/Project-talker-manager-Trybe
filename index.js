const express = require('express');
const bodyParser = require('body-parser');

const {
  getTalkers,
  talkerId,
  login,
  generateToken,
  validateEmail,
  validatePassword,
  postTalker,
  tokenVerify,
  validateName,
  validateAge,
  validateTalk,
  validateDateRate,
  putTalker,
  deleteTalker,
  getSearch,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', tokenVerify, getSearch, getTalkers);

app.get('/talker', getTalkers);

app.get('/talker/:id', talkerId);

app.post('/login', generateToken, validateEmail, validatePassword, login);

app.post('/talker',
tokenVerify, validateName, validateAge, validateTalk, validateDateRate, postTalker);

app.put('/talker/:id',
tokenVerify,
validateName,
validateAge,
validateTalk,
validateDateRate,
putTalker);

app.delete('/talker/:id', tokenVerify, deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
