const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const getTalkers = require('./middlewares/getTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const { checkEmail, checkPassword, generateToken } = require('./middlewares/postLogin');
const {
  checkToken, checkName, checkAge,
  checkWatched, checkRate, checkTalk,
  addTalker,
} = require('./middlewares/postTalker');
const upTalk = require('./middlewares/putTalkerById');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkers);
app.get('/talker/:id', getTalkerById);

app.post('/login', checkEmail, checkPassword, generateToken);
app.post('/talker', checkToken, checkName, checkAge, checkTalk, checkWatched, checkRate, addTalker);

app.put('/talker/:id', checkToken, checkName, checkAge, checkTalk, checkWatched, checkRate, upTalk);

app.listen(PORT, () => {
  console.log('Online');
});