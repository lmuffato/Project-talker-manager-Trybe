const fs = require('fs').promises;

async function fileReader() {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const parsedTalkers = JSON.parse(talkers);
  return parsedTalkers;
}

async function fileWriter(content) {
  await fs.writeFile('./talker.json', JSON.stringify(content));
}

module.exports = { fileReader, fileWriter };