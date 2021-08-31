const fs = require('fs').promises;

const readFile = () => fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));

const getTalkers = async (_req, res) => {
  const talkers = await readFile();
  res.status(200).json(talkers);
};

module.exports = getTalkers;