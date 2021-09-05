const express = require('express');
const bodyParser = require('body-parser');

const talkerModel = require('./model/talkerModel');
const {
  validateEmail,
  validatePassword,
  validateToken } = require('./service/authService');
const {
  validatePostTalkerName, 
  validatePostTalkerAge,
  validatePostTalkerTalk,
  validatePostTalkerDate,
  validatePostTalkerRate,
  addTalker,
  editTalker,
  deleteTalker,
} = require('./service/talkerService');
const { createToken } = require('./utils/tokenGenerator');
const { saveToken } = require('./model/authModel');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', async (_req, res) => {
  const talkers = await talkerModel.getAllTalkers();
  res.status(200).json(talkers);
});

// Requisito 7
app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  if (!q) {
    const talkers = await talkerModel.getAllTalkers();
    return res.status(200).json(talkers);
  }
  const filteredTalkers = await talkerModel.getTalkersByString(q.toLowerCase());
  res.status(200).json(filteredTalkers);
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerModel.getTalkerById(id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

// Requisito 3
app.post('/login', validateEmail, validatePassword, async (_req, res) => {
  console.log('rota de POST login acionada');
  const token = createToken(16);
  await saveToken(token);

  return res.status(200).json({ token });
});

// Requisito 4
app.post(
  '/talker',
  validateToken,
  validatePostTalkerName, 
  validatePostTalkerAge,
  validatePostTalkerTalk,
  validatePostTalkerDate,
  validatePostTalkerRate,
  async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const newTalker = await addTalker({ name, age, talk: { watchedAt, rate } });

    return res.status(201).json(newTalker);
  },
);

// Requisito 5
app.put(
  '/talker/:id',
  validateToken,
  validatePostTalkerName, 
  validatePostTalkerAge,
  validatePostTalkerTalk,
  validatePostTalkerDate,
  validatePostTalkerRate,
  async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    let { id } = req.params;
    id = parseInt(id, 10);
    const editedTalker = await editTalker(id, { name, age, talk: { watchedAt, rate } });
    console.log(editedTalker);
    return res.status(200).json(editedTalker);
  },
);

// Requisito 6
app.delete('/talker/:id', validateToken, async (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 10);
  await deleteTalker(id);

  return res.status(200).json({
    message: 'Pessoa palestrante deletada com sucesso',
  });
});

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
