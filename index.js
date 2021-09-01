const express = require('express');
const bodyParser = require('body-parser');

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const login = require('./middlewares/login');
const verifyToken = require('./middlewares/verifyToken');
const addNewTalker = require('./middlewares/addNewTalker');
const verifyAge = require('./middlewares/verifyAge');
const verifyName = require('./middlewares/verifyName');
const verifyRate = require('./middlewares/verifyRate');
const verifyDate = require('./middlewares/verifyDate');
const verifyTalker = require('./middlewares/verifyTalker');
const deleteTalker = require('./middlewares/deleteTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', getAllTalkers);
app.get('/talker/:id', getTalkerById);
app.post('/login', login);

app.post('/talker', [
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalker,
  verifyDate,
  verifyRate,
  addNewTalker,
]);

app.delete('/talker/:id', [
  verifyToken,
  deleteTalker,
]);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
