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
  updateTalker, 
  deleteTalker,
  searchTalker,
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

app.get('/talker/search', validateToken, searchTalker);

app.post('/talker',
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalk,
  validateDate,
  validateRate,
  writeTalker);

app.get('/talker/:id', talkerId);

app.put('/talker/:id',
validateToken,
validateTalkerName,
validateTalkerAge,
validateTalk,
validateDate,
validateRate,
updateTalker);

app.delete('/talker/:id', validateToken, deleteTalker);

app.post('/login', validateEmail, validatePassword, generateToken);

app.listen(PORT, () => {
  console.log('Online');
});