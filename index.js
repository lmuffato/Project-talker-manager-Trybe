const express = require('express');
const bodyParser = require('body-parser');

const { getTalker } = require('./endpoints');
const { getTalkerID } = require('./endpoints');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Início

// getTalkerID precisa vir antes de getTalker
// senão exibirá a lista completa
app.use('/talker/:id', getTalkerID);
app.use('/talker', getTalker);

// Fim

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
