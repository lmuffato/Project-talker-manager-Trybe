const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readTalker = async () => {
  const talker = await fs.readFile('talker.json');
  return JSON.parse(talker);
};

app.get('/talker', async (_req, res) => {
  try {
    const talker = await readTalker();
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (e) {
    res.status(NOT_FOUND).json({ message: e.message });
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
    const talker = await readTalker();
    // https://www.w3schools.com/jsref/jsref_parseint.asp considerando decimal
    const talkerById = talker.find((t) => t.id === +id);
    if (talkerById === undefined) { 
      return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
    res.status(HTTP_OK_STATUS).json(talkerById);
});

const validateEmailMiddleware = (req, res, next) => {
  const { email } = req.body;
  // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression onde peguei regex
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript onde aprendi a usar o .test
  if (email === '' || email === undefined) { 
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePasswordMiddleware = (req, res, next) => {
  const { password } = req.body;
  if (password === '' || password === undefined) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

app.post('/login', validateEmailMiddleware, validatePasswordMiddleware, (req, res) => {
  // https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
  const token = crypto.randomBytes(8).toString('hex');
  console.log(token);
  res.status(HTTP_OK_STATUS).json({ token });
});
