const express = require('express');
const bodyParser = require('body-parser');
const {
  getAllTalkers,
  getTalkerById,
  login,
  createTalker,
  deleteTalker,
  editTalker,
  verifyToken,
  verifyName,
  verifyAge,
  verifyData,
  verifyTalk,
  verifyRate,
} = require('./middleware');

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

app.get('/talker', getAllTalkers);
app.get('/talker/:id', getTalkerById);
app.post('/login', login);
app.post('/talker', [
  verifyToken,
  verifyName,
  verifyAge,
  verifyData,
  verifyTalk,
  verifyRate,
  createTalker,
]);

app.put('/talker/:id', [
  verifyToken,
  verifyName,
  verifyAge,
  verifyData,
  verifyRate,
  editTalker,
]);

app.delete('/talker/:id', [verifyToken, deleteTalker]);
