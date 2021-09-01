const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('../utils/fileSystem');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

// Requisito 3

const searchTalker = rescue(async (request, response) => {
  const { q } = request.query;

  const talkers = await fs.getTalker();

  const filteredTalkers = talkers.filter((r) => r.name.includes(q));
  if (!q || q === '') return response.status().json([]);
  if (!filteredTalkers || filteredTalkers === '') return response.status().json(talkers);

  response.status(HTTP_OK_STATUS).json(filteredTalkers);
});

module.exports = searchTalker;