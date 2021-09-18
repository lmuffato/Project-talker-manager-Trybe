const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const login = require('./login');
const addTalker = require('./addTalker');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');

const talker = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const dataTalker = JSON.parse(await fs.readFile(talker, 'utf8'));
  res.status(HTTP_OK_STATUS).json(dataTalker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const dataTalker = JSON.parse(await fs.readFile(talker, 'utf8'));
  const userTalk = dataTalker.find((user) => user.id === Number(id));
  if (!userTalk) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(userTalk);
});

app.use('/login', login);

app.use('/talker', addTalker);

app.use('/talker', editTalker);

app.use('/talker', deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
