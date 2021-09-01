const rescue = require('express-rescue');
const fs = require('../models/fileSystem');

const { getTalker } = fs;
const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;

// Requisito 2

const getTalkerById = rescue(async (request, response) => {
  const { id } = request.params;
  const getTalkers = await getTalker();
  const find = getTalkers.find((index) => index.id === parseInt(id, 10));
  console.log(find);
  if (!find) {
    return response.status(HTTP_NOT_FOUND)
    .json({ message: 'Pessoa palestrante não encontrada' });
  }

  response.status(HTTP_OK_STATUS).json(find);
});

module.exports = getTalkerById;
