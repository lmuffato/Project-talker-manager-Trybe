const express = require('express');
const bodyParser = require('body-parser');
const { readFile, writeFile } = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// --------------------------------------------------- Quesito 01 --------------------------------------------------------------------

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

// --------------------------------------------------- Quesito 02 ----------------------------------------------------------------------
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

// -------------------------------------------- Quesito 03 -----------------------------------------------------------------------------
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

// --------------------------------------------- Quesito 04 ---------------------------------------------------------------------------
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_CREATED_STATUS = 201;

const validationToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).send({ message: 'Token não encontrado' }); 
  }
  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).send({ message: 'Token inválido' });
  }

  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_BAD_REQUEST_STATUS).send({ message: 'O campo "name" é obrigatório' });
  }  
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validationAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_BAD_REQUEST_STATUS).send({ message: 'O campo "age" é obrigatório' });
  }  
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validationWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const validationwatchedAt = /\d{2}\/\d{2}\/\d{4}/g.test(watchedAt);
  if (!watchedAt) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!validationwatchedAt) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validationRates = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const validationTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

function writing(newTalker) {
  return writeFile('./talker.json', JSON.stringify(newTalker));
}

app.post('/talker',
validationToken,
validationName,
validationAge,
validationTalk,
validationWatchedAt,
validationRates,
 async (req, res) => {
  const talker = await reading('talker.json');
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalke = { id: talker.length + 1, name, age, talk: { watchedAt, rate } };
  talker.push(newTalke);

  try {
    await writing(talker);
    res.status(HTTP_CREATED_STATUS).json(newTalke);
  } catch (_e) {
    return null;
  }
});

// --------------------------------------------- Quesito 05 ---------------------------------------------------------------------------

app.put('/talker/:id',
validationToken,
validationName,
validationAge,
validationTalk,
validationWatchedAt,
validationRates,
 async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await reading('talker.json');
  const { id } = req.params;
  const talkerToEdit = {
    id: Number(id),
    name,
    age,
    talk,
  };
  talker.filter((talke) => Number(talke.id) !== Number(id));
  talker.push(talkerToEdit);

  try {
    await writing(talker);
    res.status(HTTP_OK_STATUS).json(talkerToEdit);
  } catch (_e) {
    return null;
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
