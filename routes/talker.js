const fs = require('fs/promises');

const express = require('express');

const authToken = require('../middlewares/authToken');

const { https, PATH_TALKER } = require('../utils/infos');
const { checkTalk, checkName, checkAge } = require('../utils/checkers');

const route = express.Router();

const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_CREATE_STATUS,
} = https;

const getTalkersFile = async () => {
  const data = await fs.readFile(PATH_TALKER, 'utf-8');
  const talkers = JSON.parse(data);

  return talkers;
};

const authName = (request, response, next) => {
  const { name } = request.body;

  const { message } = checkName(name);

  if (message) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message });
  }

  next();
};

const authAge = (request, response, next) => {
  const { age } = request.body;

  const { message } = checkAge(Number(age));

  if (message) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message });
  }

  next();
};

const authTalk = (request, response, next) => {
  const { talk } = request.body;

  const { message } = checkTalk(talk);

  if (message) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message });
  }

  next();
};

const createTalker = async (request, response) => {
  const { name, age, talk } = request.body;

  const talkers = await getTalkersFile();
  const talker = { id: talkers.length + 1, name, age, talk };

  const newTalkers = [...talkers, talker];
  const stringifyTalkers = JSON.stringify(newTalkers);

  await fs.writeFile(PATH_TALKER, stringifyTalkers);

  return response.status(HTTP_CREATE_STATUS).json(talker);
};

const changeTalker = async (request, response) => {
  const { name, age, talk } = request.body;
  const { id } = request.params;

  const talkers = await getTalkersFile();

  const idTalker = talkers.find((t) => t.id === Number(id)).id;
  const filteredTalkers = talkers.filter((t) => t.id !== Number(id));
  const changedTalker = { id: idTalker, name, age, talk };

  const newTalkers = [...filteredTalkers, changedTalker];
  const stringifyTalkers = JSON.stringify(newTalkers);

  await fs.writeFile(PATH_TALKER, stringifyTalkers);

  return response.status(HTTP_OK_STATUS).json(changedTalker);
};

const deleteTalker = async (request, response) => {
  const { id } = request.params;

  const talkers = await getTalkersFile();

  const filteredTalkers = talkers.filter((t) => t.id !== Number(id));
  const stringyFilteredTalkers = JSON.stringify(filteredTalkers);

  await fs.writeFile(PATH_TALKER, stringyFilteredTalkers);

  const message = { message: 'Pessoa palestrante deletada com sucesso' };

  return response.status(HTTP_OK_STATUS).json(message);
};

const searchTalker = async (request, response) => {
  const { q } = request.query;

  const talkers = await getTalkersFile();

  const filteredTalkers = talkers.filter((t) => t.name.includes(q));

  return response.status(HTTP_OK_STATUS).json(filteredTalkers);
};

route.get('/', async (_request, response) => {
  const data = await fs.readFile(PATH_TALKER, 'utf-8');

  const talkers = data ? JSON.parse(data) : [];

  return response.status(HTTP_OK_STATUS).json(talkers);
});

route.post('/', authToken, authName, authAge, authTalk, createTalker);

route.put('/:id', authToken, authName, authAge, authTalk, changeTalker);

route.delete('/:id', authToken, deleteTalker);

route.get('/search', authToken, searchTalker);

route.get('/:id', async (request, response) => {
  const { id } = request.params;

  const data = await fs.readFile(PATH_TALKER, 'utf-8');

  const talkers = data ? JSON.parse(data) : [];

  const talkerById = talkers.find((talker) => talker.id === Number(id));

  if (!talkerById) {
    const notFound = { message: 'Pessoa palestrante não encontrada' };

    return response.status(HTTP_NOT_FOUND_STATUS).json(notFound);
  }

  return response.status(HTTP_OK_STATUS).json(talkerById);
});

module.exports = route;
