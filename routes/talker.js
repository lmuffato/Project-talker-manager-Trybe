const express = require('express');
const validate = require('../validation/talkerValidation');
const authMiddlware = require('../middlewares/auth');
const { getAllTalkers, createTalker, editTalker, deleteTalker } = require('../services');

const talkerRouter = express.Router();
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const NOT_FOUND_STATUS = 404;

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

talkerRouter.put('/:id', authMiddlware, async (_request, response) => {
  const validationError = validate(_request.body);
  if (validationError) {
    return response.status(BAD_REQUEST_STATUS).json(validationError);
  }
  const talker = await editTalker(Number(_request.params.id), _request.body);
  response.status(HTTP_OK_STATUS).json(talker);
});

talkerRouter.delete('/:id', authMiddlware, async (_request, response) => {
  await deleteTalker(Number(_request.params.id));
  response.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = talkerRouter;