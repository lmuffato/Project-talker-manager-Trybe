const express = require('express');
const bodyParser = require('body-parser');

const { talker, talkerId, login, addMiddlewares, validateToken,
  validatesMiddlewares, deleteMiddlewares, editMiddlewares,
  searchMiddlewares } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', validateToken, searchMiddlewares);

app.get('/talker', talker);

app.get('/talker/:id', talkerId);

app.post('/login', login);

app.post('/talker',
  validateToken,
  validatesMiddlewares.validateName,
  validatesMiddlewares.validateAge,
  validatesMiddlewares.validateTalk,
  validatesMiddlewares.validateTalkDate,
  validatesMiddlewares.validateTalkRate,
  addMiddlewares);

app.put('/talker/:id',
  validateToken,
  validatesMiddlewares.validateName,
  validatesMiddlewares.validateAge,
  validatesMiddlewares.validateTalk,
  validatesMiddlewares.validateTalkDate,
  validatesMiddlewares.validateTalkRate,
  editMiddlewares);

app.delete('/talker/:id', validateToken, deleteMiddlewares);

app.listen(PORT, () => {
  console.log('Online');
});
