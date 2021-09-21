const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';

function emailValidation(email) {
  const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return regex.test(email);
}

function tokenGeneration() {
  return crypto.randomBytes(8).toString('hex');
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await fs.readFile('talker.json', 'utf-8');
  const fetchData = await JSON.parse(data);

  res.status(HTTP_OK_STATUS).json(fetchData);
});

app.get('/talker/:id', (req, res) => {
  const data = JSON.parse(fs.readFile('talker.json', 'utf-8'));
  console.log(data);
  const { id } = req.params;
  const idTalker = data.find((talker) => talker.id === +id);
  const errorMessage = {
    message: 'Pessoa palestrante não encontrada',
  };

  return idTalker 
  ? res.status(HTTP_OK_STATUS).json(idTalker) 
  : res.status(HTTP_NOT_FOUND).json(errorMessage);
});

app.post('/login', (req, res) => {
  const token = tokenGeneration();
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (emailValidation(email) === false) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password === undefined) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
