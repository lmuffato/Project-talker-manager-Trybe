const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('../utils/fileSystem');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

// Requisito 3

const editTalker = rescue(async (request, response) => {
  const { id } = request.params;
  const { name, age, talk } = request.body;
  
  const talkers = await fs.getTalker();
  console.log(talkers);

  const find = talkers.find(((obj) => obj.id === +id));

  talkers[find] = { ...talkers[find], name, age, id: +id, talk };

  console.log(talkers);

  await fs.setTalker([talkers, talkers[find]]);
  
  response.status(HTTP_OK_STATUS).json(talkers[find]);
});

module.exports = editTalker;
