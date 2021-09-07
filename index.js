const express = require('express');
const bodyParser = require('body-parser');

// Requisito 1
const { getTalker } = require('./endpoints');

// Requisito 2
const { getTalkerID } = require('./endpoints');

// Requisito 3
const { tokenLogin } = require('./endpoints');
const { validarEmail } = require('./endpoints');
const { validarPassword } = require('./endpoints');

// Requisito 4
const { addPalestrante } = require('./endpoints');
const { validarToken } = require('./endpoints');
const { validarNome } = require('./endpoints');
const { validarIdade } = require('./endpoints');
const { validarData } = require('./endpoints');
const { validarNota } = require('./endpoints');
const { validarTalk } = require('./endpoints');

// Requisito 5
const { editarPalestrante } = require('./endpoints');

// Requisito 6
const { deletarPalestrante } = require('./endpoints');

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

const validadores = [
  validarToken,
  validarNome,
  validarIdade,
  validarTalk,
  validarNota,
  validarData,
];

app.put('/talker/:id', validadores, editarPalestrante);

app.post('/talker', validadores, addPalestrante);

app.delete('/talker/:id', validarToken, deletarPalestrante);

// Fim

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
