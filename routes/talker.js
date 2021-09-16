const express = require('express');
const fs = require('fs').promises;

const talkerRouter = express.Router();
const HTTP_OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;

talkerRouter.get('/', async (_request, response) => {
  const data = await fs.readFile('talker.json');
  response.status(HTTP_OK_STATUS).send(JSON.parse(data));
});

talkerRouter.get('/:id', async (_request, response) => {
  const data = await fs.readFile('talker.json');
  const jsonData = JSON.parse(data);
  const findUser = jsonData.find((user) => user.id === Number(_request.params.id));
  if (!findUser) {
    response.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).send(findUser);
});

module.exports = talkerRouter;