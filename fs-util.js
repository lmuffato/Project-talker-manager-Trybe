const fs = require('fs').promises;

function readFile() {
  const talkers = fs.readFile('./talker.json', 'utf-8');
  return talkers.then((data) => JSON.parse(data));
}

function writeFileTalker(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

module.exports = { readFile, writeFileTalker };