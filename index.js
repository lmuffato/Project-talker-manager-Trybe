const express = require('express');
const bodyParser = require('body-parser');

const getTalkersList = require('./middlewares/getTalkersList');
const getTalkerId = require('./middlewares/getTalkerId');
const { checkEmail, checkPassword } = require('./middlewares/login');
const { checkAuth,
  checkName,
  checkAge,
  checkTalk,
  checkTalkWatchDate,
  checkTalkRate } = require('./middlewares/createTalker');

const {
  editCheckAuth,
  editCheckName,
  editCheckAge,
  editCheckTalk,
  editCheckTalkWatchDate,
  editCheckTalkRate } = require('./middlewares/editTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkersList);

app.get('/talker/:id', getTalkerId);

app.post('/login', checkEmail, checkPassword);

app.post('/talker',
  checkAuth,
  checkName,
  checkAge,
  checkTalk,
  checkTalkWatchDate,
  checkTalkRate);

app.put('/talker/:id',
  editCheckAuth,
  editCheckName,
  editCheckAge,
  editCheckTalk,
  editCheckTalkWatchDate,
  editCheckTalkRate);

app.use((err, _req, res, _next) => {
  console.log('Passou pelo middleware');
  res.status(400).json({ message: err });
});

app.listen(PORT, () => {
  console.log('Online');
});
