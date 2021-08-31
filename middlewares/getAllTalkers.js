const fs = require('fs').promises;

const readTalkers = () => fs.readTalkers('./talker.json', 'utf-8').then((data) => JSON.parse(data));

const getAllTalkers = async (_req, res) => {
  const talkersList = await readTalkers();
  res.status(200).json(talkersList);
};

module.exports = getAllTalkers;
