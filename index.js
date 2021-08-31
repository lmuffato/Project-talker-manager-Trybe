const express = require('express');
const bodyParser = require('body-parser');

// REFACTORING...
const getTalker = require('./mid/getTalker');
const putTalkerID = require('./mid/putTalkerID');
const { getTalkerID } = require('./mid/getTalkerID');
const { validateLogin } = require('./mid/postLogin');
const deleteTalkerID = require('./mid/deleteTalkerID');
const getTalkerSearch = require('./mid/getTalkerSearch');
const {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validateToken,
  createTalker,
} = require('./mid/postTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// REFACTORING...
app.get('/talker/search', validateToken, getTalkerSearch);
app.get('/talker', getTalker);
app.get('/talker/:id', getTalkerID);
app.post('/login', validateLogin);
app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  createTalker,
);
app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  putTalkerID,
);
app.delete('/talker/:id', validateToken, deleteTalkerID);

app.listen(PORT, () => {
  console.log('Online');
});
