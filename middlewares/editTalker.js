const fs = require('fs').promises;
const database = require('../database');
const { ok } = require('../httpStatusCode');

const editTalker = async (req, res, _next) => {
  const talker = req.body;
  const idTalker = Number(req.params.id);

  const readArchive = await fs.readFile(database, 'utf-8')
  .then((data) => JSON.parse(data));

  const filterDatabase = readArchive.filter(({ id }) => idTalker !== id);

  filterDatabase.push({ id: idTalker, ...talker });

  await fs.writeFile(database, JSON.stringify(filterDatabase))
  .then(() => {
    console.log('Arquivo escrito com sucesso!');
  });

  return res.status(ok).json({ id: idTalker, ...talker });
};

module.exports = editTalker;
