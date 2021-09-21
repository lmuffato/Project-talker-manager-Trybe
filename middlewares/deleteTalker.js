const fs = require('fs').promises;
const database = require('../database');
const { ok } = require('../httpStatusCode');

const deleteTalker = async (req, res, _next) => {
  const idTalker = Number(req.params.id);

  const readArchive = await fs.readFile(database, 'utf-8')
  .then((data) => JSON.parse(data));

  const filterDatabase = readArchive.filter(({ id }) => idTalker !== id);

  await fs.writeFile(database, JSON.stringify(filterDatabase))
  .then(() => {
    console.log('Arquivo escrito com sucesso!');
  });

  return res.status(ok).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
