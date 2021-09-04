const express = require('express');
const bodyParser = require('body-parser');

const { showTalkers, getTalkerById, login, validateToken,
  validateTalker, createTalker, editTalker,
  deleteTalker, searchTalker } = require('./middlewares');

const { HTTP_OK_STATUS } = require('./utils/statusHttp');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', validateToken, searchTalker);

app.get('/talker/:id', getTalkerById);

app.put('/talker/:id',
  validateToken,
  validateTalker.validateName,
  validateTalker.validateAge,
  validateTalker.validateTalk,
  validateTalker.validateTalkDate,
  validateTalker.validateTalkRate,
  editTalker);

app.delete('/talker/:id', validateToken, deleteTalker);

app.get('/talker', showTalkers);

app.post('/talker',
  validateToken,
  validateTalker.validateName,
  validateTalker.validateAge,
  validateTalker.validateTalk,
  validateTalker.validateTalkDate,
  validateTalker.validateTalkRate,
  createTalker);

app.post('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
