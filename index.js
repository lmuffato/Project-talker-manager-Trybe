const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const UIDGenerator = require('uid-generator');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkers = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readFile = () => fs.readFile(talkers, 'utf8')
  .then((data) => JSON.parse(data));

app.get('/talker', async (_req, res) => {
  const talkersList = await readFile();
  return res.status(HTTP_OK_STATUS).json(talkersList);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile();
  const foundTalker = talkersList.find((talker) => talker.id === parseInt(id, 0));

  if (!foundTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).send(foundTalker);
});

function emailValidation(req, res, next) {
  const { email } = req.body;
  const regexValidation = /^\w+@\w+\.com$/; // Regex feito com base no projeto TrybeWallet. src=https://github.com/tryber/sd-010-a-project-trybewallet/pull/21/files 
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (regexValidation.test(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

function passwordValidation(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

function tokenGenerator(_req, res) {
  const newToken = new UIDGenerator(UIDGenerator.BASE16); // Src = https://www.npmjs.com/package/uid-generator
  return res.status(200).json({ token: newToken.baseEncoding });
}

app.post('/login', emailValidation, passwordValidation, tokenGenerator, (_req, _res) => {
});