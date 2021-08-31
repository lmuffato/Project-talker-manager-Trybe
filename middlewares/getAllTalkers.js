const fs = require('fs').promises;

const readFile = () => fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));

const getAllTalkers = async (_req, res) => {
  const talkersList = await readFile();
  const result = await JSON.parse(talkersList);
  res.status(200).json(result);
};

module.exports = getAllTalkers;
