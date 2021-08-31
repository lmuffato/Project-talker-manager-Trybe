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

function nameValidation(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 0) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function talkValidation(req, res) {
  const { talk: { watchedAt, rate } } = req.body;
  const { talk } = req.body;
  const dataRegex = /\n# $&:\n\t/;
  if (dataRegex.test(watchedAt) === false) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } if (!talk || !watchedAt || !rate) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    }); 
  }
}

app.post('/talker', nameValidation, ageValidation, talkValidation, (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
});