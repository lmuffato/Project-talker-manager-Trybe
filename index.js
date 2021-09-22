const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_NOT_FOUND_STATUS = 404;
const FILE_TALKERS = './talker.json';
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const validateEmail = (req, res, next) => {
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;

  if (!email || email === '') { 
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!validEmail.test(email)) { 
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const PASSWORD_MIN_SIZE = 6;

  if (!password || password === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < PASSWORD_MIN_SIZE) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  const NAME_MIN_SIZE = 3;
  
  if (!name || name === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }
  
  if (name.length < NAME_MIN_SIZE) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const MIN_AGE = 18;
  
  if (!age || age === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }
  
  if (age < MIN_AGE) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk || talk === {} || !talk.watchedAt || talk.rate === undefined) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  
  next();
};

const validateRateAndWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const validDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  if (!validDate.test(talk.watchedAt)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const TOKEN_MAX_SIZE = 16;

  if (!authorization) { 
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }
  
  if (authorization.length < TOKEN_MAX_SIZE) { 
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }

  next();
};

app.get('/talker/search', validateToken,

async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(FILE_TALKERS, 'utf-8'));
  const { q } = req.query;
  const searchTerm = talkers.filter((t) => t.name.includes(q));

  if (searchTerm === undefined || searchTerm === '') {
    return res.status(HTTP_NOT_FOUND_STATUS).json(talkers);
  }

  if (!searchTerm) {
    return res.status(HTTP_NOT_FOUND_STATUS).json([]);
  }

  res.status(HTTP_OK_STATUS).json(searchTerm);
});

app.get('/talker/:id', async (req, res) => {
  const content = await fs.readFile(FILE_TALKERS, 'utf-8');
  const { id } = req.params;
  const talker = JSON.parse(content).find((c) => c.id === +id);
  
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker', async (_req, res) => {
  const content = await fs.readFile(FILE_TALKERS, 'utf-8');
  return res.status(HTTP_OK_STATUS).json(JSON.parse(content));
});

app.post('/login', validateEmail, validatePassword, 
(_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validateToken, validateName, 
validateAge, validateTalk, validateRateAndWatchedAt,
async (req, res) => {
  const content = JSON.parse(await fs.readFile(FILE_TALKERS, 'utf-8'));
  const { name, age, talk } = req.body;
  const lastId = content[content.length - 1].id;
  
  content.push({ id: lastId + 1, name, age, talk });
  const newTalker = await content[content.length - 1];
  const talkers = JSON.stringify(content);
  fs.writeFile(FILE_TALKERS, talkers);
  return res.status(HTTP_CREATED_STATUS).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});

/* Referências:
  Como converter uma string em json: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
  Como gerar um token aleatório com 16 caracteres: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  Regex para email válido retirado do projeto já realizado (APP Receitas): https://github.com/tryber/sd-010-a-project-recipes-app/pull/89/commits/83cb72f06dd96973ca365d9c06ce59e4d1c2cbad
  Regex para data válida: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript

*/
