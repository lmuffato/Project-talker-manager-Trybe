const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const talker = async () => fs.readFile('./talker.json').then((res) => JSON.parse(res));
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// Req 1
app.get('/talker', async (_req, res) => {
  const respostaTalker = await talker(); 
  if (respostaTalker.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  } 
    return res.status(HTTP_OK_STATUS).json(talker);
});

// Req 2 
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const respostaTalker = await talker(); 
  const findTalker = respostaTalker.find((talk) => talk.id === +(id));
  if (!findTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(HTTP_OK_STATUS).json(findTalker);
});

// req 3
function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function validarEmail(req, res, next) {
  const { email } = req.body;
  const regexEmailValidade = /\S+@\S+\.\S+/;
  const tesEmailValido = regexEmailValidade.test(email);
  if (!email || email.length === 0) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  } if (!tesEmailValido) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
}

function validarPassword(req, res, next) {
  const { password } = req.body;
  
  if (!password || password.length === 0) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  } if (password.length <= 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
}

app.post('/login',
validarEmail,
validarPassword,
(_req, res) => {
  res.status(200).json({ token: generateToken() });
});

/* const resquestName = (req, res, next) => {
  const { name } = req.body;
  if (name === String) {
    return res.status(200).json({ name });
  }
  next();
};

app.post('/talker',
resquestName,
(req, res) => {
  const { name } = req.body;
  res.status(200).json()
  ) */
  
app.listen(PORT, () => {
  console.log('Online');
});
