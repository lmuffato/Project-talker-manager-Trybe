const readFile = require('./readFile');

const getAllTalkers = async (_req, res) => {
  const talkerList = await readFile();
  return res.status(200).json(talkerList);
};

module.exports = getAllTalkers;