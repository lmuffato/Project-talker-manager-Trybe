const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';

const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

// Special Thanks to Adelino Junior T10-A, who helped me to solve the problem with the GET '/talker' endpoint and its logics

const readFile = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkers);
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readFile();
  if (talkers.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!talker) {
    return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regexEmail.test(email)) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

app.listen(PORT, () => {
  console.log('Online');
});
