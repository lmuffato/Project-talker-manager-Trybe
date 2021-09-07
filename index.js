const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalkers,
  talkerId,
  login,
  generateToken,
  validateEmail,
  validatePassword } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkers);
app.get('/talker/:id', talkerId);
app.post('/login', generateToken, validateEmail, validatePassword, login);

app.listen(PORT, () => {
  console.log('Online');
});
