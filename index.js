const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('fs').promises;
const crypto = require('crypto');

const notFound = require('./notFound');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf8', (err, content) => {
    if (err) return [];
    return content;
  });
  return JSON.parse(talkers);
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get(
  '/talker/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const talker = await getTalkers().then((talkers) =>
      talkers.find((t) => t.id === Number(id)));
    if (!talker) {
      throw new Error();
    }
    res.status(HTTP_OK_STATUS).json(talker);
  }),
);

app.use(notFound);

app.get('/talker', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

const generateToken = () => crypto.randomBytes(8).toString('hex');

const validadeEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email,
    );
  if (!mailformat) {
    res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validadePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

app.post('/login', validadeEmail, validadePassword, async (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});
