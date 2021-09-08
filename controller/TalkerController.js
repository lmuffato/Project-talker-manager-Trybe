const express = require('express');

const { getTalkers, getTalker, registerTalker, deleteTalker } = require('../service/TalkerService');
const { tokenIsValid } = require('../service/LoginService');

const {
  HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS, HTTP_UNAUTHORIZED, HTTP_BAD_REQUEST, HTTP_CREATED,
} = require('../config/Server');

const { ROUTE_BASE, ROUTE_TALKER_GET_BY_ID } = require('../config/Routes');
const { SRC_TALKER_DATA } = require('../config/Files');

const talkerController = express();

talkerController.get(ROUTE_BASE, async (request, response) => {
  let talkers = await getTalkers(SRC_TALKER_DATA);
  if (!talkers.length) talkers = [];

  response.status(HTTP_OK_STATUS).json(talkers);
});

talkerController.get(ROUTE_TALKER_GET_BY_ID, async (request, response) => {
  const { id } = request.params;
  const talker = await getTalker(id, SRC_TALKER_DATA);
  const messageError = { message: 'Pessoa palestrante não encontrada' };

  if (!talker) {
    response.status(HTTP_NOT_FOUND_STATUS).json(messageError);
    return;
  }

  response.status(HTTP_OK_STATUS).json(talker);
});

talkerController.post(ROUTE_BASE, async (request, response) => {
  const { authorization } = request.headers;
  const talker = request.body;

  try {
    tokenIsValid(authorization);
  } catch (error) {
    const { message } = error;
    response.status(HTTP_UNAUTHORIZED).json({ message });
    return;
  }

  try {
    const talkerRegistered = await registerTalker(talker);
    response.status(HTTP_CREATED).json(talkerRegistered);
  } catch (error) {
    const { message } = error;
    response.status(HTTP_BAD_REQUEST).json({ message });
  }
});

talkerController.delete(ROUTE_TALKER_GET_BY_ID, async (request, response) => {
  const { authorization } = request.headers;
  const { id } = request.params;

  try {
    tokenIsValid(authorization);
  } catch (error) {
    const { message } = error;
    response.status(HTTP_UNAUTHORIZED).json({ message });
    return;
  }

  try {
    await deleteTalker(id);
    response.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    const { message } = error;
    response.status(HTTP_BAD_REQUEST).json({ message });
  }
});

module.exports = talkerController;
