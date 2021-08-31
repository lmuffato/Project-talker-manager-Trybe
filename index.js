const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');

const {
  getTalkers,
  findTalkerById,
  validateEmail,
  validatePassword,
  generateToken,
  validateToken,
} = middlewares;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkers);
app.get('/talker/:id', findTalkerById);

app.post('/login', validateEmail, validatePassword, generateToken);
app.post('/talker', validateToken);

app.listen(PORT, () => {
  console.log('Online');
});
