const express = require('express');
const bodyParser = require('body-parser');

const getTalkersList = require('./getTalkersList');
const getTalkerId = require('./getTalkerId');
const { checkToken, checkEmail, checkPassword } = require('./login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkersList);

app.get('/talker/:id', getTalkerId);

app.post('/login', checkToken, checkEmail, checkPassword);

app.use((err, _req, res, _next) => {
  console.log('Passou pelo middleware');
  res.status(400).json({ message: err });
});

app.listen(PORT, () => {
  console.log('Online');
});
