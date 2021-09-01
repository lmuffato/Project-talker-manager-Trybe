const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const crypto = require('crypto');
const {
  validateEmail,
  validatePassword,
  validateAge,
  validateName,
  validateTalk,
  validateToken,
  validateDateFormat,
  validateRate,
} = require('./middlewares/validators');
const { fileReader, fileWriter } = require('./utils/talkersFileOperations');

const talkerValidators = [
  validateAge,
  validateName,
  validateTalk,
  validateDateFormat,
  validateRate,
];

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => res.status(HTTP_OK_STATUS).json(fileReader() || []));

app.get('/talker/search', async (req, res) => {
  const { name } = req.query;
  const parsedTalkers = fileReader();
  const queriedTalker = parsedTalkers.filter((t) => t.name.includes(name));

  return res.status(200).json(queriedTalker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const parsedTalkers = fileReader();

  const talker = parsedTalkers.find((t) => t.id === +id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

app.post('/talker', validateToken, talkerValidators, async (req, res) => {
  const { name, age, talk } = req.body;
  
  const parsedTalkers = fileReader();

  const talker = {
    id: parsedTalkers.length + 1,
    name,
    age,
    talk,
  };

  const newTalkers = [...parsedTalkers, talker];
  
  await fileWriter(newTalkers);

  return res.status(201).json(talker);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const randomToken = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token: randomToken });
});

app.put('/talker/:id', validateToken, talkerValidators, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const parsedTalkers = fileReader();
  const filteredTalkersObj = parsedTalkers.filter((t) => t.id !== +id);
  
  const editedTalker = {
    id: +id,
    name,
    age,
    talk,
  };
  const newTalkers = [...filteredTalkersObj, editedTalker];
  await fs.writeFile('./talker.json', JSON.stringify(newTalkers));
  return res.status(200).json(editedTalker);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const parsedTalkers = fileReader();
  const filteredTalkersObj = parsedTalkers.filter((t) => t.id !== +id);

  await fs.writeFile('./talker.json', JSON.stringify(filteredTalkersObj));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
