const fs = require('fs').promises;

const manageTalkersFile = async () => {
  const content = await fs.readFile('./talker.json', 'utf-8');
  const talkers = await JSON.parse(content);
  return talkers;
};

module.exports = manageTalkersFile;
