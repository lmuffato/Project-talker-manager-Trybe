const express = require('express');
const bodyParser = require('body-parser');
const {
  readFile,
  writeFile,
  generateId,
  generateToken,
} = require('../services/utils');
const {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateWatchedAtAndRate,
  validateTalk,
} = require('../validations/validations');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readFile();
  if (talkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkerId = talkers.findIndex(({ id: i }) => i === +id);
  if (talkerId === -1) {
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
}

  res.status(HTTP_OK_STATUS).json(talkers[talkerId]);
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', 
validateToken,
validateTalk,
validateWatchedAtAndRate,
validateName,
validateAge,
async (req, res) => {
const { name, age, talk } = req.body;
const talkers = await readFile();
const id = generateId(talkers);
const newObj = ({ name, age, id, talk });
talkers.push(newObj);
writeFile(talkers);

return res.status(201).json(newObj);
});

app.put('/talker/:id', 
validateToken,
validateTalk,
validateWatchedAtAndRate,
validateName,
validateAge,
async (req, res) => {
const { id } = req.params;
const { name, age, talk } = req.body;
const talkers = await readFile();
const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
if (talkerIndex === -1) return res.status(404).json({ message: 'ID não encontrado' });
talkers[talkerIndex].name = name;
talkers[talkerIndex].age = age;
talkers[talkerIndex].talk = talk;
writeFile(talkers);

return res.status(200).json(talkers[talkerIndex]);
}); 

module.exports = {
  app,
};
