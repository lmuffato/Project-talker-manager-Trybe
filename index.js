const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { writeFileSync } = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;
const PORT = '3000';

const caminhoTalker = path.resolve(__dirname, './', 'talker.json');

function verificaEmail(email) {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return emailRegex.test(email);
}

function geraToken() {
  return crypto.randomBytes(8)
    .toString('hex');
}

const validateToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};
const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};
const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || talk.rate === undefined || !talk.watchedAt) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt"'
        + ' e "rate" não podem ser vazios',
    });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const re = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!re.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).json();
});

// Requisito 7
app.get('/talker/search', validateToken, async (request, response) => {
  const { query: { q } } = request;
  const content = await fs.readFile(caminhoTalker, 'utf-8');
  const talkers = JSON.parse(content);
  const talkersFilters = talkers.filter((e) => e.name.toUpperCase().includes(q.toUpperCase()));
  if (q === undefined || q === '') {
   return response.status(HTTP_OK_STATUS).json(talkers);
  }
  return response.status(HTTP_OK_STATUS)
  .json(talkersFilters);
});

// Requisito 1
app.get('/talker', (_request, response) => {
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  try {
    response.status(HTTP_OK_STATUS).json(data);
  } catch (error) {
    response.status(HTTP_OK_STATUS).json([]);
  }

  /*   if (data === []) {
      response.status(HTTP_OK_STATUS).json([]);
    }response.status(HTTP_OK_STATUS).json(data); */
});

// Requisito 2

app.get('/talker/:id', (request, response) => {
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const { id } = request.params;
  const talkerId = data.find((talker) => talker.id === Number(id));
  const messageError = { message: 'Pessoa palestrante não encontrada' };

  return talkerId
    ? response.status(HTTP_OK_STATUS).json(talkerId)
    : response.status(HTTP_NOT_FOUND).json(messageError);
});

// Requisito 3
app.post('/login', (request, response) => {
  const token = geraToken();
  const { email, password } = request.body;
  if (email === undefined) {
    return response.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (verificaEmail(email) === false) {
    return response.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password === undefined) {
    return response.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) {
    return response.status(HTTP_BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return response.status(HTTP_OK_STATUS).json({ token });
});

// Requisito 4
app.post('/talker',
validateName, validateToken, validateTalk, validateAge, validateRate,
  validateWatchedAt,
  async (request, response) => {
    const { body } = request;
    const content = await fs.readFile(caminhoTalker, 'utf-8');
    const talkers = JSON.parse(content);
    const newTalker = { id: talkers[talkers.length - 1].id + 1, ...body };
    const allTalkers = [...talkers, newTalker];
    await fs.writeFile(caminhoTalker, JSON.stringify(allTalkers, null, 2), 'utf-8');
    if (newTalker) {
      return response.status(201).json(newTalker);
    }
  });

  // Requisito 5
app.put('/talker/:id', 
validateName, validateToken, validateTalk, validateAge, validateRate,
  validateWatchedAt,
async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  const content = await fs.readFile(caminhoTalker, 'utf-8');
  const talkerEdit = { id: Number(id), ...body };
  const talkers = JSON.parse(content).map((e) => {
 if (e.id !== Number(id)) return e; 
return talkerEdit; 
});
   await fs.writeFile(caminhoTalker, JSON.stringify(talkers, null, 2), 'utf-8');
   return response.status(HTTP_OK_STATUS).json(talkerEdit);
});

// Requisito 6
app.delete('/talker/:id', validateToken, async (request, response) => {
  const { id } = request.params;
  const content = await fs.readFile(caminhoTalker, 'utf-8');
  const talkers = JSON.parse(content).filter((e) => e.id !== Number(id));
  await fs.writeFile(caminhoTalker, JSON.stringify(talkers, null, 2), 'utf-8');
  return response.status(HTTP_OK_STATUS)
  .json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});