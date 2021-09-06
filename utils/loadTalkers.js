const fs = require('fs').promises;

const FILEPATH = './talker.json';

const loadTalkers = async () => {
  const content = await fs.readFile(FILEPATH, 'utf-8');
  const talkers = await JSON.parse(content);
  return talkers;
};

module.exports = loadTalkers;