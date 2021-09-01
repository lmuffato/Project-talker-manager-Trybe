const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readTalkers = async () => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(file);
};

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

// Requisito 1:

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

// Requisito 7:

app.get('/talker/search', tokenValidation, async (req, res) => {
  const { name } = req.query;
  const talkers = await readTalkers();
  if (!name) return res.status(200).json(talkers);
  const queryTalkers = talkers.filter((t) => t.name.includes(name));
  res.status(200).json(queryTalkers);
});

// Requisito 2:

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkers();
  const { id } = req.params;
  const myTalker = talkers.find((t) => t.id === parseInt(id, 10));
  if (!myTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(myTalker);
});

// Requisito 3:

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email === '') { 
    return res
    .status(400)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!reg.test(email)) { 
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400)
    .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

app.post('/login', validateEmail, validatePassword, (req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

// Requisito 4:

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const watchedAtValidation = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const reg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!reg.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (rate > 5 || rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const postTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readTalkers();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  talkers.push(newTalker);
  await fs.writeFile('talker.json', JSON.stringify(talkers));
  return res.status(201).json(newTalker);
};

app.post('/talker', [
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  postTalker,
]);

// Requisito 5:

const putTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readTalkers();
  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
  await fs.writeFile('talker.json', JSON.stringify(talkers));
  res.status(200).json(talkers[talkerIndex]);
};

app.put('/talker/:id', [
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  putTalker,
]);

// Requisito 6: 

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkers();
  const newTalkers = talkers.filter((t) => t.id !== parseInt(id, 10));
  await fs.writeFile('talker.json', JSON.stringify(newTalkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

app.delete('/talker/:id', [
  tokenValidation,
  deleteTalker,
]);
