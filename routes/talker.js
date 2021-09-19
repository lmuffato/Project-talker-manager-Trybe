const express = require('express');
const fs = require('fs').promises;
const validate = require('../validation/talkerValidation');
const authMiddlware = require('../middlewares/auth');

const talkerRouter = express.Router();
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const NOT_FOUND_STATUS = 404;

async function getAllTalkers() {
  const data = await fs.readFile('talker.json');
  return JSON.parse(data);
}

async function createTalker(talker) {
  const data = await getAllTalkers();
  const { id } = data[data.length - 1];
  const newTalkerData = { id: id + 1, ...talker };
  data.push(newTalkerData);
  await fs.writeFile('talker.json', JSON.stringify(data), 'utf8');
  return newTalkerData;
}

talkerRouter.get('/', async (_request, response) => {
  const data = await getAllTalkers();
  response.status(HTTP_OK_STATUS).send(data);
});

talkerRouter.get('/:id', async (_request, response) => {
  const data = await getAllTalkers();
  const findUser = data.find((user) => user.id === Number(_request.params.id));
  if (!findUser) {
    response.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).send(findUser);
});

talkerRouter.post('/', authMiddlware, async (_request, response) => {
  const validationError = validate(_request.body);
  if (validationError) {
    return response.status(BAD_REQUEST_STATUS).json(validationError);
  }
  const talker = await createTalker(_request.body);
  response.status(HTTP_CREATED_STATUS).json(talker);
});

module.exports = talkerRouter;