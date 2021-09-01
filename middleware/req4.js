const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('../models/fileSystem');

app.use(bodyParser.json());

const HTTP_CREATED = 201;

// Requisito 3

const createTalker = rescue(async (request, response) => {
  const { name, age, talk } = request.body;

  const talkers = await fs.getTalker();

  const id = parseInt(talkers[talkers.length - 1].id + 1, 10);

  talkers.push({ name, age, id, talk });
  
  await fs.setTalker(talkers);
  
  response.status(HTTP_CREATED).json({ name, age, id, talk });
});

module.exports = createTalker;
