const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Quesito 01

const reading = async (file) => {
  let readfile = await readFile(file);
  readfile = JSON.parse(readfile);

  return readfile;
};

app.get('/talker', async (_req, res) => {
  try {
    const talker = await reading('talker.json');
    if (!talker) return res.status(HTTP_OK_STATUS).send([]);
    res.status(HTTP_OK_STATUS).send(talker);
  } catch (_e) {
    return null;
  }
});

// Quesito 02
const HTTP_NOT_FOUND_STATUS = 404;
const mensage = 'Pessoa palestrante não encontrada';

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const talker = await reading('talker.json');
    const talke = talker.find((t) => t.id === +id);

    if (!talke) return res.status(HTTP_NOT_FOUND_STATUS).send({ message: mensage });

    res.status(HTTP_OK_STATUS).send(talke);
  } catch (_e) {
    return null;
  }
});

// Quesito 03
// Referencia para a criação do tolken: https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback

const HTTP_BAD_REQUEST_STATUS = 400;

const crypto = require('crypto');

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

const validationEmail = (email) => {
  if (!email) return 'O campo "email" é obrigatório';
  const verificationEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (!verificationEmail) return 'O "email" deve ter o formato "email@email.com"';
  return null;
};

const validationPassWord = (password) => {
  if (!password) return 'O campo "password" é obrigatório';
  const passWord = password.toString();
  if (passWord.length < 6) return 'O "password" deve ter pelo menos 6 caracteres';
  return null;
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const verificationEmail = validationEmail(email);
  const verificationPassword = validationPassWord(password);

  try {
    if (verificationEmail !== null) {
      return res.status(HTTP_BAD_REQUEST_STATUS).send({ message: verificationEmail });
    }

    if (verificationPassword !== null) {
      return res.status(HTTP_BAD_REQUEST_STATUS).send({ message: verificationPassword });
    }

    res.status(HTTP_OK_STATUS).json({ token: tokenGenerator() });
  } catch (_e) {
    return null;
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
