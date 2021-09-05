const fs = require('fs').promises;

const DIRECTORY = './talker.json';

const parsedData = async () => {
  const talkers = await fs.readFile(DIRECTORY, 'utf-8');

  return JSON.parse(talkers);
};

module.exports = parsedData;
