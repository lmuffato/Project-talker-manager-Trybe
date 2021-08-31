const express = require('express');
const bodyParser = require('body-parser');

const getTalkers = require('./middlewares/getTalkers');
const getTalkersID = require('./middlewares/getTalkersID');
const { emailValidation, passwordValidation, tokenGenerator } = require('./middlewares/login');
const talkerValidations = require('./middlewares/talkerValidation');
const createTalker = require('./middlewares/createTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', getTalkers);
app.get('/talker/:id', getTalkersID);

app.post('/login', emailValidation, passwordValidation, tokenGenerator);
app.post('/talker', talkerValidations, createTalker);