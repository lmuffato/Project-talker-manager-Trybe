const express = require('express');
const bodyParser = require('body-parser');
const authToken = require('./middlewares/authToken');
const showTalkers = require('./middlewares/showTalkers');
const showTalkerById = require('./middlewares/showTalkerById');
const createLogin = require('./middlewares/createLogin');
const deleteTalker = require('./middlewares/deleteTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// app.get('/talker/search', searchTalkerByName);

app.post('/login', createLogin);

app.get('/talker/:id', showTalkerById);

app.delete('/talker/:id', authToken, deleteTalker);

app.get('/talker', showTalkers);

// app.post('/talker', authToken, validateName, validateAge, createTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
