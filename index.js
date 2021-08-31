const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');

const { validateEmail, validatePassword, generateToken } = middlewares;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', middlewares.findTalkerById);
app.get('/talker/:id', middlewares.findTalkerById);

app.post('/login', validateEmail, validatePassword, generateToken);

app.listen(PORT, () => {
  console.log('Online');
});
