const fs = require('fs').promises;
const database = require('../database');
const { created } = require('../httpStatusCode');

const createTalker = async (req, res, _next) => {
  const talker = req.body;
  
  const readArchive = await fs.readFile(database, 'utf-8')
  .then((data) => JSON.parse(data));
  
  readArchive.push({ id: readArchive.length + 1, ...talker });
  
  await fs.writeFile(database, JSON.stringify(readArchive))
    .then(() => {
    console.log('Arquivo escrito com sucesso!');
  });

  return res.status(created).json({ id: readArchive.length, ...talker });
};

module.exports = createTalker;
