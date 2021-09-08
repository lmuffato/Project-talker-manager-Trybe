const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const { StatusCodes } = require('http-status-codes');
const talker = require('./routes/talker');
const login = require('./routes/login');

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(StatusCodes.OK).send();
});

app.use('/talker', talker);

app.use('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
