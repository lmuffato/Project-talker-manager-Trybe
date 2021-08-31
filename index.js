const express = require('express');
const bodyParser = require('body-parser');

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

const fs = require('fs').promises;

// 1 - Crie o endpoint GET /talker

app.get('/talker', async (_req, res) => {
  try {
    const content = await fs.readFile('./talker.json');
    const talker = JSON.parse(content);
    res.status(200).json(talker);
  } catch (e) {
    res.status(200).json([]);
  }
});

// 2 - Crie o endpoint GET /talker/:id

app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const content = await fs.readFile('./talker.json');
    const talker = JSON.parse(content);
    const talkerId = talker.findIndex((t) => t.id === +id);
    if (talkerId === -1) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } else {
      res.status(200).json(talker[talkerId]);
    }
});

// 3 - Crie o endpoint POST /login

const verifyEmailExists = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } 
    next();
};

const verifyEmailPattern = (req, res, next) => {
  const { email } = req.body;
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  
  if (emailPattern.test(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
    next();
};

const verifyPasswordExists = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
    next();
};

const verifyPasswordLenght = (req, res, next) => {
  const { password } = req.body;
  
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } 
    next();
};

const generateToken = () => {
  const length = 16;
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];  
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
};

app.post('/login', 
verifyEmailExists, verifyEmailPattern, 
verifyPasswordExists, verifyPasswordLenght, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});