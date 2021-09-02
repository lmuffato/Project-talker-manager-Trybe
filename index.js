const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;

const readFile = async () => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  const dataTalkers = JSON.parse(file);
  return dataTalkers;
};

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_OK201_STATUS = 201;
const HTTP_NOTFOUND_STATUS = 404;
const HTTP_ERROR400_STATUS = 400;
const HTTP_ERROR401_STATUS = 401;
const PORT = '3000';

const messageNotFound = {
  message: 'Pessoa palestrante não encontrada',
};
const messageEmailRequired = {
  message: 'O campo "email" é obrigatório',
};
const messageEmailFormat = {
  message: 'O "email" deve ter o formato "email@email.com"',
};
const messagePassRequired = {
  message: 'O campo "password" é obrigatório',
};
const messagePassFormat = {
  message: 'O "password" deve ter pelo menos 6 caracteres',
};
const messageTokenNotFound = {
  message: 'Token não encontrado',
};
const messageTokenFormat = {
  message: 'Token inválido',
};
const messageNameRequired = {
  message: 'O campo "name" é obrigatório',
};
const messageNameFormat = {
  message: 'O "name" deve ter pelo menos 3 caracteres',
};
const messageAgeRequired = {
  message: 'O campo "age" é obrigatório',
};
const messageAgeInvalid = {
  message: 'A pessoa palestrante deve ser maior de idade',
};
const messageWatchFormat = {
  message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
};
const messageRateFormat = {
  message: 'O campo "rate" deve ser um inteiro de 1 à 5',
};
const messageWatchAndRateRequired = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};
const messageDeleteTalker = { message: 'Pessoa palestrante deletada com sucesso' };

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 1
app.get('/talker', async (_req, res) => {
  const dataTalkers = await readFile();
  if (dataTalkers.length > 0) return res.status(HTTP_OK_STATUS).json(dataTalkers);
  return res.status(HTTP_OK_STATUS).json([]);
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
  const dataTalkers = await readFile();

  const dataTalkerFiltered = dataTalkers.find((talker) => talker.id === +id);

  if (dataTalkerFiltered) return res.status(HTTP_OK_STATUS).json(dataTalkerFiltered);
  throw Error();
  } catch (error) {
    return res.status(HTTP_NOTFOUND_STATUS).json(messageNotFound);
  }
});

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) return res.status(HTTP_ERROR400_STATUS).json(messageEmailRequired);
  if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)) {
    return res.status(HTTP_ERROR400_STATUS).json(messageEmailFormat);
  }
  next();
}

function validatePass(req, res, next) {
  const { password } = req.body;
  if (!password) return res.status(HTTP_ERROR400_STATUS).json(messagePassRequired);
  if (password.length < 6) return res.status(HTTP_ERROR400_STATUS).json(messagePassFormat);
  next();
}

function generateToken() {
  const token = Math.random().toString(16).substr(8) + Math.random().toString(16).substr(6);
  if (token.length !== 16) {
    return Math.random().toString(16).substr(8) + Math.random().toString(16).substr(6);
  }
  return token;
}

function generateAuth(_req, res) {
  const auth = generateToken();
  if (auth.length === 16) {
    const token = { token: auth };
    return res.status(HTTP_OK_STATUS).json(token);
  }
    const secondAuth = generateToken();
    const token = { token: secondAuth };
    return res.status(HTTP_OK_STATUS).json(token);
}

function validateToken(_req, res, authorization) {
  if (!authorization) return res.status(HTTP_ERROR401_STATUS).json(messageTokenNotFound);
  if (authorization.length !== 16) {
    return res.status(HTTP_ERROR401_STATUS).json(messageTokenFormat);
  }
  return true;
}

function validateName(_req, res, name) {
  const minNameLength = 3;
  if (!name) return res.status(HTTP_ERROR400_STATUS).json(messageNameRequired);
  if (name.length < minNameLength) {
    return res.status(HTTP_ERROR400_STATUS).json(messageNameFormat);
  }
  return true;
}

function validateAge(_req, res, age) {
  const minAgeAllowed = 18;
  if (!age || age === '') return res.status(HTTP_ERROR400_STATUS).json(messageAgeRequired);
  if (age < minAgeAllowed) {
    return res.status(HTTP_ERROR400_STATUS).json(messageAgeInvalid);
  }
  return true;
}

function validateTalkExists(_req, res, talk) {
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(HTTP_ERROR400_STATUS).json(messageWatchAndRateRequired);
  }
  return true;
}
function validateTalk(req, res, talk) {
  validateTalkExists(req, res, talk);
  if (talk.watchedAt.split('/').length !== 3) {
    return res.status(HTTP_ERROR400_STATUS).json(messageWatchFormat);
  } if (talk.rate > 5 || (talk.rate < 1 || talk.rate === 0)) {
    return res.status(HTTP_ERROR400_STATUS).json(messageRateFormat);
  }
    return true;
}

function validateTalker(req, res, next) {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;
  
  validateToken(req, res, authorization);
  validateName(req, res, name);
  validateAge(req, res, age);
  validateTalk(req, res, talk);

  next();
}

async function createTalker(req, res) {
  const { name, age, talk } = req.body;
  try {
  const dataTalkers = await readFile();
  const newTalker = { name, age, id: dataTalkers.length + 1, talk };
  dataTalkers.push(newTalker);
  await fs.writeFile('talker.json', JSON.stringify(dataTalkers));
  return res.status(HTTP_OK201_STATUS).json(newTalker);
  } catch (error) {
    return error;
  }
}

async function updateTalker(req, res) {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  try {
    const dataTalkers = await readFile();
    const editTalker = { name, age, id: +id, talk };
    const filteredTalkers = dataTalkers.filter((talker) => (talker.id !== id));
    filteredTalkers.push(editTalker);
    await fs.writeFile('talker.json', JSON.stringify(filteredTalkers));
    return res.status(HTTP_OK_STATUS).json(editTalker);
  } catch (error) {
    return error;
  }
}

function validateTokenForDeleteTalker(req, res, next) {
  const { authorization } = req.headers;
  validateToken(req, res, authorization);
  next();
}

async function deleteTalker(req, res) {
  const { id } = req.params;
  try {
    const dataTalkers = await readFile();
    const newDataTalkers = dataTalkers.filter((talker) => talker.id !== +id);
    await fs.writeFile('talker.json', JSON.stringify(newDataTalkers));
    return res.status(HTTP_OK_STATUS).json(messageDeleteTalker);
  } catch (error) {
    return error;
  }
}

// Requisito 3
app.post('/login', validateEmail, validatePass, generateAuth);

// Requisito 4
app.post('/talker', validateTalker, createTalker);

// Requisito 5
app.put('/talker/:id', validateTalker, updateTalker);

// Requisito 6
app.delete('/talker/:id', validateTokenForDeleteTalker, deleteTalker);