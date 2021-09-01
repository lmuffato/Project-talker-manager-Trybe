const express = require('express');
const bodyParser = require('body-parser');

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerByID = require('./middlewares/getTalkerByID');

const {
  emailValidation,
  passwordValidation,
  tokenDispatch,
} = require('./middlewares/checkLogin');

const {
  nameCheck,
  ageCheck,
  talkCheck,
  registerTalker,
} = require('./middlewares/createTalker');

const validateToken = require('./middlewares/validateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAllTalkers);
app.get('/talker/:id', getTalkerByID);
app.post('/login', emailValidation, passwordValidation, tokenDispatch);
app.post('/talker', validateToken, nameCheck, ageCheck, talkCheck, registerTalker);
app.post('/talker/:id', validateToken);
// ---------------------

app.listen(PORT, () => {
  console.log('Online');
});
