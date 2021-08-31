const express = require('express');
const bodyParser = require('body-parser');

const getTalkers = require('./getTalkers');
const getTalkersID = require('./getTalkersID');

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
