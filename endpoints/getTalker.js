const fs = require('fs').promises;

const getTalker = async (_req, res, _next) => {
  const ler = await fs.readFile('./talker.json', 'utf-8');
  const lido = await JSON.parse(ler);
  return res.status(200).json(lido);
};

module.exports = getTalker;