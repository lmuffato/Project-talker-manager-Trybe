const fs = require('fs').promises;
const talker = require('./talker.json');

const getAll = async () => {
  const allTalkers = await fs.readFile(talker, 'utf-8')
  .catch(() => null);
  return allTalkers;
};

module.exports = {
  getAll,
};
