const fs = require('fs').promises;

const talkers = () => fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));

const getTalkers = async (_req, res) => {
  const data = await talkers();
  res.status(200).json(data);
};

module.exports = getTalkers;
