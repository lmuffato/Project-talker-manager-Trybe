const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const getTalkers = require('./getTalker');
const getTalkerId = require('./getTalkerId');
const newTalker = require('./postTalker');
const editTalker = require('./putTalker');
const deleteTalker = require('./deleteTalker');
const validations = require('./middleware/validations');
const searchTalker = require('./getSearch');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// app.get('/talker', (_req, res) => res.status(200).send({ message: 'hello word!' }));
app.get('/talker', getTalkers);
app.get('/talker/:id', getTalkerId);
app.post('/login', validations.checkEmail, validations.checkPassWord, validations.cryptoGenerate);
app.post('/talker',
  newTalker.authorizationToken,
  newTalker.checkName,
  newTalker.checkAge,
  newTalker.checkTalk,
  newTalker.checkWatchedAt,
  newTalker.checkRate,
  newTalker.createdTalker);
app.put('/talker/:id',
  newTalker.authorizationToken,
  newTalker.checkName,
  newTalker.checkAge,
  newTalker.checkTalk,
  newTalker.checkWatchedAt,
  newTalker.checkRate,
  editTalker.editTalker);
app.delete('/talker/:id',
  newTalker.authorizationToken,
  deleteTalker.delTalker);
app.get('/talker/search',
  newTalker.authorizationToken,
  searchTalker.searchTalker);

app.listen(PORT, () => {
  console.log('Online');
});
