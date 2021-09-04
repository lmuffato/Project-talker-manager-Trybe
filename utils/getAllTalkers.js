const fs = require('fs').promises;

const getAllTalkers = async () => {
  const content = await fs.readFile('./talker.json', 'utf-8');
  const talkers = await JSON.parse(content);
  return talkers;
};

module.exports = getAllTalkers;
