const fs = require('fs/promises');

const readFile = () => {
  const file = fs.readFile('./talker.json', 'utf-8');
  return file.then((data) => JSON.parse(data));
};

const getAllTalkers = async (_req, res) => {
  const talkerList = await readFile();
  return res.status(200).json(talkerList);
};

module.exports = getAllTalkers;