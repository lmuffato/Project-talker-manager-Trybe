const express = require('express');
const bodyParser = require('body-parser');
const validatePassword = require('./middlewares/validatePassword');
const validateEmail = require('./middlewares/validateEmail');
const authToken = require('./middlewares/authToken');
const showTalkers = require('./middlewares/showTalkers');
const showTalkerById = require('./middlewares/showTalkerById');
const createLogin = require('./middlewares/createLogin');
const deleteTalker = require('./middlewares/deleteTalker');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const createTalker = require('./middlewares/createTalker');
const validateTalk = require('./middlewares/validateTalk');
const validadeRate = require('./middlewares/validadeRate');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const updateTalker = require('./middlewares/updateTalker');
const searchTalkerByName = require('./middlewares/searchTalkerByName');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker/search', authToken, searchTalkerByName);

app.get('/talker/:id', showTalkerById);

app.put('/talker/:id', authToken, validateName, validateAge, validateTalk, validateWatchedAt,
validadeRate, updateTalker);

app.delete('/talker/:id', authToken, deleteTalker);

app.post('/login', validateEmail, validatePassword, createLogin);

app.get('/talker', showTalkers);

app.post('/talker', authToken, validateName, validateAge, validateTalk, validadeRate,
  validateWatchedAt, createTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
