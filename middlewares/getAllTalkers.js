const fs = require('fs').promises;
const database = require('../database');
const { ok } = require('../httpStatusCode');

const getAllTalkers = async (_req, res, _next) => {
  const readArchive = await fs.readFile(database, 'utf-8')
    .then((data) => JSON.parse(data));

  if (!readArchive) {
    res.status(ok).json([]);
  }

  res.status(ok).json(readArchive);
};

module.exports = getAllTalkers;
