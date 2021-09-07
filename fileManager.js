const fs = require('fs').promises;

async function fileReader() {
  const response = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(response);
  return talkers;
}

async function fileWrite(text) {
  const newTalker = await fs.writeFile('./talker.json', JSON.stringify(text));
  return newTalker;
}

module.exports = { fileReader, fileWrite };