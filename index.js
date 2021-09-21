const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const getTalkers = require('./getTalker');
const getTalkerId = require('./getTalkerId');
// const create = require('./postLogin');
const validations = require('./middleware/validations');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// app.get('/talker', (_req, res) => res.status(200).send({ message: 'hello word!' }));
app.get('/talker', getTalkers);
app.get('/talker/:id', getTalkerId);
app.post('/login', validations.cryptoGenerate);

app.listen(PORT, () => {
  console.log('Online');
});
