const express = require('express');
const bodyParser = require('body-parser');

const { getTalker } = require('./endpoints');
const { getTalkerID } = require('./endpoints');
const { tokenLogin } = require('./endpoints');
const { validarEmail } = require('./endpoints');
const { validarPassword } = require('./endpoints');

const { addPalestrante } = require('./endpoints/index');
const { validarToken } = require('./endpoints');
const { validarNome } = require('./endpoints');
const { validarIdade } = require('./endpoints');
const { validarDataEvento } = require('./endpoints');
const { validarNota } = require('./endpoints');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Início

// getTalkerID precisa vir antes de getTalker
// senão exibirá a lista completa
app.get('/talker/:id', getTalkerID);

app.get('/talker', getTalker);

app.post('/login', validarEmail, validarPassword, tokenLogin);

const teste = [
  validarToken,
  validarNome,
  validarIdade,
  validarDataEvento,
  validarNota,
  addPalestrante,
 ];

app.post('/talker', teste);

// Fim

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
