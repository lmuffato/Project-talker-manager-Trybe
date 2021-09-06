const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const getTalkersList = require('./middlewares/getTalkersList');
const getTalkerId = require('./middlewares/getTalkerId');
const { checkEmail, checkPassword } = require('./middlewares/login');
const { checkAuth,
  checkName,
  checkAge,
  checkTalk,
  checkTalkWatchDate,
  checkTalkRate } = require('./middlewares/createTalker');

const {
  editCheckAuth,
  editCheckName,
  editCheckAge,
  editCheckTalk,
  editCheckTalkWatchDate,
  editCheckTalkRate } = require('./middlewares/editTalker');

  // const { deleteCheckAuth } = require('./middlewares/deleteTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkersList);

app.get('/talker/:id', getTalkerId);

app.post('/login', checkEmail, checkPassword);

app.post('/talker',
  checkAuth,
  checkName,
  checkAge,
  checkTalk,
  checkTalkWatchDate,
  checkTalkRate);

app.put('/talker/:id',
  editCheckAuth,
  editCheckName,
  editCheckAge,
  editCheckTalk,
  editCheckTalkWatchDate,
  editCheckTalkRate);

app.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  const talkersList = await fs.readFile('./talker.json');
  const talkers = JSON.parse(talkersList);
  const deleteTalker = talkers.findIndex((talker) => talker.id === Number(id));
  delete talkers[deleteTalker];
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.use((err, _req, res, _next) => {
  console.log('Passou pelo middleware');
  res.status(400).json({ message: err });
});

app.listen(PORT, () => {
  console.log('Online');
});
