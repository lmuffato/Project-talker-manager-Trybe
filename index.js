const express = require('express');
const bodyParser = require('body-parser');

const { 
  validateAge,
  validateName,
  validateTalk,
  validateTalkDate,
  validateTalkRate,
  validateToken,
  validateIdFromURL,
  } = require('./validations');

const getAllTalkers = require('./desafio1');
const getTalkerById = require('./desafio2');
const login = require('./desafio3');
const createTalker = require('./desafio4');
const updateTalker = require('./desafio5');
const deleteTalker = require('./Desafio6');
const searchTalker = require('./desafio7');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Desafio 7
app.get('/talker/search', validateToken, searchTalker);

// Desafio 2
app.get('/talker/:id', getTalkerById);

// Desafio 3
app.post('/login', login);

// Desafio 6
app.delete('/talker/:id', validateToken, validateIdFromURL, deleteTalker);

// Desafio 5
app.put('/talker/:id', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkDate,
  validateTalkRate,
  validateIdFromURL,
  updateTalker);

// Desafio 4
app.post('/talker', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkDate,
  validateTalkRate,
  createTalker);  

// Desafio 1
app.get('/talker', getAllTalkers);

app.listen(PORT, () => {
  console.log('Online');
});
