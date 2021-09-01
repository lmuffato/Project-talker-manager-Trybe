const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('../utils/fileSystem');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

// Requisito 3

const deleteTalker = rescue(async (request, response) => {
  const { id } = request.params;
  
  const talkers = await fs.getTalker();

  const find = talkers.find(((obj) => obj.id === +id));

  const splice = talkers.splice(find, 1);
  
  await fs.setTalker(splice);

  response.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = deleteTalker;