const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');
const { isValidEmail, isValidPassword, isValidToken } = require('./validations/login');
const { 
  isValidName, 
  isValidAge, 
  isValidTalk, 
  isValidaDate, 
  isValidaRate, 
  } = require('./validations/talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const palestrante = async () => {
  const talker = await fs.readFile('talker.json', 'utf-8');
  return JSON.parse(talker);
};

const findIdPalestrante = async (id) => {
  const findId = parseInt(id, 10);
  const arrayPalestrante = await palestrante();
  const talkerID = arrayPalestrante.find((talker) => talker.id === findId);
  return talkerID;
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

app.get('/talker', async (_req, res) => {
  const talker = await palestrante();
  return res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const findId = await findIdPalestrante(id);
  if (!findId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(findId);
});

app.post('/login', isValidEmail, isValidPassword, async (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

app.post('/talker', isValidToken, isValidName, isValidAge, isValidTalk, isValidaDate, isValidaRate, 
  async (req, res) => {
  const { body } = req;
  const talker = await palestrante();
  const newTalker = ({ id: talker.length + 1, ...body });
  await fs.writeFile('talker.json', JSON.stringify([...talker, newTalker]));
  res.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
