const express = require('express');
const bodyParser = require('body-parser');

const getTalkers = require('./getTalkers');
const getTalker = require('./getTalker');
const { validEmail, validPassword, tokenCrypto } = require('./validations');

const {
  tokenAuthorized,
  nameAuthorized,
  ageAuthorized,
  talkAuthorized,
  dateAuthorized,
  rateAuthorized,
  createdTalker,
} = require('./createTalker');

// const { createdTalker } = require('./createTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkers);

app.get('/talker/:id', getTalker);

app.post('/login', validEmail, validPassword, tokenCrypto);

app.post('/talker',
tokenAuthorized,
nameAuthorized,
ageAuthorized,
talkAuthorized,
dateAuthorized,
rateAuthorized,
createdTalker);

app.listen(PORT, () => {
  console.log('Online');
});
