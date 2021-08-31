const express = require('express');

const { getTalkers, getTalker } = require('../service/TalkerService');

const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../config/Server');
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

  if (!talker) return response.status(HTTP_NOT_FOUND_STATUS).json(messageError);

  response.status(HTTP_OK_STATUS).json(talker);
});

module.exports = talkerController;
