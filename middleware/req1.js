const rescue = require('express-rescue');
const fs = require('../utils/fileSystem');

const { getTalker } = fs;
const HTTP_OK_STATUS = 200;

// Requisito 1

const getAllTalkers = rescue(async (_request, response) => {
  const getTalkers = await getTalker();
  if (!getTalkers || getTalkers === '') return response.status(HTTP_OK_STATUS).json([]);

  return response.status(HTTP_OK_STATUS).json(getTalkers);
});

module.exports = getAllTalkers;
