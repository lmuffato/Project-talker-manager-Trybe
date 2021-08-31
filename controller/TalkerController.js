const express = require('express');

const { getTalkers } = require('../service/TalkerService');

const { HTTP_OK_STATUS } = require('../config/Server');
const { ROUTE_BASE } = require('../config/Routes');
const { SRC_TALKER_DATA } = require('../config/Files');

const talkerController = express();

talkerController.get(ROUTE_BASE, async (request, response) => {
  let talkers = await getTalkers(SRC_TALKER_DATA);
  if (!talkers.length) talkers = [];

  response.status(HTTP_OK_STATUS).json(talkers);
});

module.exports = talkerController;
