const fs = require('fs').promises;

const getTalkerId = async (req, res) => {
  const content = await fs.readFile('./talker.json');
  const talkers = JSON.parse(content);
  const { id } = req.params;
  const talker = talkers.find((t) => t.id === parseInt(id.substring(id.length - 1), 10));
  // https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
};

module.exports = getTalkerId;
