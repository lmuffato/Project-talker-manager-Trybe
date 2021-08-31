const fs = require('fs').promises;

const TALKERS = 'talker.json';

const readFiles = async () => {
  const talkers = await fs.readFile(TALKERS, 'utf-8');
  const parsedTalkers = JSON.parse(talkers);
  return parsedTalkers;
};

module.exports = {
  readFiles,
};