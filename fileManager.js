const fs = require('fs').promises;

async function fileReader() {
  const response = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(response);
  return talkers;
}

module.exports = fileReader;