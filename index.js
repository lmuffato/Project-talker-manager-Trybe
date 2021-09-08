const express = require('express');
const bodyParser = require('body-parser');
const routerTalker = require('./routerTalker');
const { verifyEmail, verifyPassword } = require('./auth');
const generateToken = require('./token');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', routerTalker);

app.post('/login',
verifyEmail,
verifyPassword,
(_request, response) => response.status(HTTP_OK_STATUS).json({ token: generateToken() }));

app.listen(PORT, () => {
  console.log('Online');
});
