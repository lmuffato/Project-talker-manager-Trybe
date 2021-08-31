const fs = require('fs').promises;

const readFile = () => fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));

const getAllTalkers = async (_req, res) => {
  const talkersList = await readFile();
  res.status(200).json(talkersList);
};

module.exports = getAllTalkers;
