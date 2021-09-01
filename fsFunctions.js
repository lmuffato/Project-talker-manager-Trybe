const fs = require('fs').promises;

async function getAllTalkers() {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkers);
}

async function writeTalker(newFile) {
  const newTalke = await fs.writeFile('./talker.json', JSON.stringify(newFile));
  return newTalke;
}

module.exports = { getAllTalkers, writeTalker };
