const fs = require('fs').promises;

const readTalker = async () => {
  const talker = await fs.readFile('talker.json');
  return JSON.parse(talker);
};

const writeTalker = async (data) => {
  await fs.writeFile('talker.json', JSON.stringify(data));
};

module.exports = { readTalker, writeTalker };