const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const randomToken = require('random-token');
const http = require('./helper/httpStatus');
const login = require('./middlewares/validateLogin');
const tokenAuth = require('./middlewares/validateToken');
const talkerAuth = require('./middlewares/validateTalker');

const app = express();
app.use(bodyParser.json());

const { validateAge,
  validateName,
  validateRate,
  validateTalk,
  validateWatchedAt,
} = talkerAuth;
const { 
  validateToken,
} = tokenAuth;

const PORT = '3000';

// Special Thanks to Adelino Junior T10-A, who helped me to solve the problem with the GET '/talker' endpoint and its logics

const readFile = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkers);
};

const writeFile = (content) => fs.writeFile('./talker.json', JSON.stringify(content));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(http.OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readFile();
  if (talkers.length === 0) {
    return res.status(http.OK_STATUS).json([]);
  }
  res.status(http.OK_STATUS).json(talkers);
});

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await readFile();
  const filteredTalkers = talkers.filter((t) => t.name.includes(q));

  if (!q) {
    return res.status(http.OK_STATUS).json(talkers);
  }

  if (!filteredTalkers) {
    return res.status(http.OK_STATUS).json([]);
  }

  res.status(http.OK_STATUS).json(filteredTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!talker) {
    return res.status(http.NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(http.OK_STATUS).json(talker);
});

app.post('/login', login.validateEmail, login.validatePassword, async (req, res) => {
  const token = randomToken(16);
  
  res.status(http.OK_STATUS).json({ token });
});

app.use(validateToken);

app.post('/talker',
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readFile();
  const id = talkers.length + 1;

  talkers.push({ name, age, id, talk });
  writeFile(talkers);
  res.status(http.CREATED).json({ name, age, id, talk });
});

app.put('/talker/:id',
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const intId = parseInt(id, 10);
  const talkers = await readFile();
  const index = id - 1;

  talkers[index].name = name;
  talkers[index].age = age;
  talkers[index].talk = talk;
  
  writeFile(talkers);
  res.status(http.OK_STATUS).json({ name, age, id: intId, talk });
});

app.delete('/talker/:id',
async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const filteredTalkers = talkers.find((t) => t.id !== parseInt(id, 10));
  
  writeFile(filteredTalkers);
  res.status(http.OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
