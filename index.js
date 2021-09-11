const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const joi = require('joi');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;
const HTTP_CREATED = 201;
const PORT = '3000';

const caminhoTalker = path.resolve(__dirname, './', 'talker.json');
function geraToken() {
  return crypto.randomBytes(8)
 .toString('hex');
}

function verificaEmail(email) {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return emailRegex.test(email);
}

const validaToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const verificaTalker = joi
  .object({
    name: joi
      .string()
      .min(3)
      .messages({ 'string.min': 'O "name" deve ter pelo menos 3 caracteres' })
      .required(),
    age: joi
      .number()
      .integer()
      .min(18)
      .message('A pessoa palestrante deve ser maior de idade')
      .required(),
    talk: joi
      .object({
        watchedAt: joi
          .string()
          .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
          .message('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"')
          .required(),
        rate: joi
          .number()
          .integer()
          .min(1)
          .max(5)
          .messages({
            'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
            'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
          })
          .required(),
      })
      .required()
      .messages({
        'any.required':
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      }),
  })
  .messages({
    'any.required': 'O campo {#label} é obrigatório',
  }); 

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 7
app.get('/talker/search', validaToken, async (request, response) => {
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
app.get('/talker', async (_request, response) => {
  const content = await fs.readFile(caminhoTalker, 'utf-8');
  const talkers = JSON.parse(content); // transforma um JSON em um objeto JS
  response.status(HTTP_OK_STATUS).json(talkers);
});

// Requisito 2
app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const content = await fs.readFile(caminhoTalker, 'utf-8');
  const talker = JSON.parse(content).find((e) => e.id === Number(id));
  return talker 
  ? response.status(HTTP_OK_STATUS).json(talker)
  : response.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
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
app.post('/talker', validaToken, async (request, response) => {
  const { body } = request;
  if (verificaTalker.validate(body).error) {
  return response.status(HTTP_BAD_REQUEST)
  .json({ message: verificaTalker.validate(body).error.details[0].message });
  } 
  const content = await fs.readFile(caminhoTalker, 'utf-8');
  const talkers = JSON.parse(content);
  const newTalker = { id: talkers[talkers.length - 1].id + 1, ...body };
  const allTalkers = [...talkers, newTalker];
  await fs.writeFile(caminhoTalker, JSON.stringify(allTalkers, null, 2), 'utf-8');
  return response.status(HTTP_CREATED).json(newTalker);
});

// Requisito 5
app.put('/talker/:id', validaToken, async (request, response) => {
  const { id } = request.params;
  const { body } = request;

   if (verificaTalker.validate(body).error) {
    return response.status(HTTP_BAD_REQUEST)
    .json({ message: verificaTalker.validate(body).error.details[0].message });
    }
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
app.delete('/talker/:id', validaToken, async (request, response) => {
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