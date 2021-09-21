const express = require('express');
const bodyParser = require('body-parser');
const {
  getAllTalkers,
  getTalkerById,
  login,
  validationToken,
  validationTalker,
  validationFieldTalk,
  validationDateAndRate,
  createTalker,
  editTalker,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkerById);

app.post('/login', login);

app.post(
  '/talker',
  validationToken,
  validationTalker,
  validationFieldTalk,
  validationDateAndRate,
  createTalker,
);

app.put(
  '/talker/:id',
  validationToken,
  validationTalker,
  validationFieldTalk,
  validationDateAndRate,
  editTalker,
);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
