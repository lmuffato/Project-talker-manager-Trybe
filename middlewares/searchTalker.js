const fs = require('fs').promises;
const database = require('../database');
const { ok } = require('../httpStatusCode');

const searchTalker = async (req, res, _next) => {
  const searchTerm = req.query.q;

  const readArchive = await fs.readFile(database, 'utf-8')
  .then((data) => JSON.parse(data));

  if (!searchTerm) {
    return res.status(ok).json(readArchive);
  }

  const talkerFound = readArchive.filter(({ name }) => name.includes(searchTerm));

  if (!talkerFound) {
    return res.status(ok).json([]);
  }

  return res.status(ok).json(talkerFound);
};

module.exports = searchTalker;
