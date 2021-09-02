const express = require('express');
const bodyParser = require('body-parser');

const showTalkers = require('./middlewares/showTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const login = require('./middlewares/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', getTalkerById);

app.get('/talker', showTalkers);

app.post('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
