const fs = require('fs').promises;
const database = require('../database');
const { ok, notFound } = require('../httpStatusCode');

const getTalkerById = async (req, res, _next) => {
  const talkerId = Number(req.params.id);
  const readArchive = await fs.readFile(database, 'utf-8')
    .then((data) => JSON.parse(data));

  const findTalker = readArchive.find(({ id }) => id === talkerId);

  if (!findTalker) {
    res.status(notFound).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(ok).json(findTalker);
};

module.exports = getTalkerById;
