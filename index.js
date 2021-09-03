const express = require('express');
const bodyParser = require('body-parser');
const fsAsync = require('fs').promises;
const randToken = require('rand-token');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

function getToken() {
 const key = randToken.uid(16);
 return { token: key };
}

// function authToken(req, res, next) {
//   const { authorization } = req.headers;
//   if (authorization.length !== 16 || !authorization) {
//     return res.status(401).json({ message: 'Invalid Token' });
//   }
//   next();
// }

async function searchTalkerByName(req, res) {
  try {
    const { name } = req.query;
    const resp = await fsAsync.readFile('./talker.json', 'utf-8');
    const respJson = JSON.parse(resp);
    const talkers = respJson.filter((e) => e.name.includes(toString(name)));
    if (!talkers) return res.status(401).json({ message: 'Token não encontrado' });
    res.status(200).json(talkers);
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

app.get('/talker/search', searchTalkerByName);

async function showTalkerById(req, res) {
  try {
    const { id } = req.params;
    const resp = await fsAsync.readFile('./talker.json', 'utf-8');
    const respJson = JSON.parse(resp);
    const filteredTalker = respJson.find((e) => e.id === parseInt(id, 10));
    if (!filteredTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(filteredTalker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

app.get('/talker/:id', showTalkerById);

async function showTalkers(_req, res) {
  try {
    const resp = await fsAsync.readFile('./talker.json', 'utf-8');
    if (!resp) return res.status(500).json({ message: 'no data found' });
    res.status(200).json(JSON.parse(resp));
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

app.get('/talker', showTalkers);

function validadePassword(req, res) {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
}

function validadeEmail(req, res) {
  const { email } = req.body;
  const regex = /^[\w.]+@[a-z]+\.\w{3}$/g;
  const validEmail = regex.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
}

async function createLogin(req, res) {
  try {
    const validEmail = await validadePassword(req, res);
    const validPassword = await validadeEmail(req, res);
    if (!validEmail && !validPassword) return res.status(200).json(getToken());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

app.post('/login', createLogin);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
