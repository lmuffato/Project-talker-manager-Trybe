const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const randToken = require('rand-token');

const app = express();
app.use(bodyParser.json());

app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');

  return res.status(200).json(JSON.parse(talkers));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(talkers)
    .filter((tal) => tal.id === Number(id));

  if (talker.length < 1) {
    return res.status(404).json({
     message: 'Pessoa palestrante não encontrada',
   });
  }

  res.status(200).json(talker[0]);
});

const validationEmail = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email === '') {
    return {
      message: 'O campo "email" é obrigatório',
    };
  }

  if (!re.test(email)) {
    return {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }

  return 'Err';
};

const validationPassword = (password) => {
  if (!password || password === '') {
    return {
      message: 'O campo "password" é obrigatório',
    };
  }

  if (password.length < 6) {
    return {
      message: 'O "password" deve ter pelo menos 6 caracteres',
    };
  }

  return 'err';
};

app.post('/login', async (req, res) => {
  const { password, email } = req.body;
  const resultEmail = validationEmail(email);
  const resultPasswod = validationPassword(password);

  if (resultEmail.message) {
    return res.status(400).json(resultEmail);
  }

  if (resultPasswod.message) {
    return res.status(400).json(resultPasswod);
  }

  const token = randToken.generate(16);
  return res.status(200).json({ token });
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
