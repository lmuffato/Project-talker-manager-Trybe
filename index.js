const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const {
  createToken,
  readContentFile,
  writeContentFile,
  updateContentFile,
  deleteContentFile,
  searchTextContentFile,
  searchIdContentFile,
} = require('./functions');

const {
  validateToken,
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
} = require('./talkerValidations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
const content = await fs.readFile('./talker.json');
const talks = JSON.parse(content);
  res.status(HTTP_OK_STATUS).json(talks);
});

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const filteredTalkers = await searchTextContentFile(q);
  res.status(HTTP_OK_STATUS).json(filteredTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await searchIdContentFile(id);
  if (!talkerById) {
 return res.status(HTTP_NOT_FOUND_STATUS)
  .json({ message: 'Pessoa palestrante não encontrada' }); 
}
  res.status(HTTP_OK_STATUS).json(talkerById);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
const token = createToken();
res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validateToken, validateName, validateAge,
validateTalk, validateRate, validateWatchedAt, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerList = await readContentFile();
  const newTalker = { id: talkerList.length + 1, name, age, talk };
  await writeContentFile(newTalker);
  
  res.status(201).json(newTalker);
}); 

app.put('/talker/:id', validateToken, validateName, validateAge,
validateTalk, validateRate, validateWatchedAt, async (req, res) => {
const { id } = req.params;
const { name, age, talk } = req.body;
  const updatedTalker = { name, age, talk, id: parseInt(id, 10) };
  await updateContentFile(updatedTalker, id);
  res.status(HTTP_OK_STATUS).json(updatedTalker);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
const { id } = req.params;
  await deleteContentFile(id);
res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
