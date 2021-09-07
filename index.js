const express = require('express');
const bodyParser = require('body-parser');
const fsAsync = require('fs').promises;
const getToken = require('./middlewares/getToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

async function authToken(req, res, next) {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' }); 
    }
    
    const { token } = JSON.parse(authorization);
    
    if (token.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  } catch (err) {
    console.log(err.message);
  }
}

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

async function showTalkers(_req, res) {
  try {
    const resp = await fsAsync.readFile('./talker.json', 'utf-8');
    if (!resp) return res.status(500).json({ message: 'no data found' });
    res.status(200).json(JSON.parse(resp));
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

function validadePassword(req, res) {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
}

function validateEmail(req, res) {
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
    const validPassword = await validateEmail(req, res);
    if (!validEmail && !validPassword) return res.status(200).json(getToken());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O campo "name" deve ter pelo menos 3 caracteres' });
  }
  next(); 
}

function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
} 

async function readJson() {
  const file = await fsAsync.readFile('./talker.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    return data;
  });
  return file;
}

async function createTalker(req, res) {
  const { talk } = req.body;
  try {
    const newTalker = { name: req.body.name, age: req.body.age, talk };
    const array = await readJson();
    const newArray = [...JSON.parse(array), newTalker];
    await fsAsync.writeFile('./talker.json', JSON.stringify(newArray));
    res.status(201).json(JSON.parse(array));
  } catch (err) {
    console.log(err.message);
  }
}

app.post('/login', createLogin);

app.get('/talker/search', searchTalkerByName);

app.get('/talker/:id', showTalkerById);

app.get('/talker', showTalkers);

app.post('/talker', authToken, validateName, validateAge, createTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
