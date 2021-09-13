const fs = require('fs');

const talker = 'talker.json';

function readFile() {
  const data = fs.readFileSync(talker, 'utf-8');

  return JSON.parse(data);
}

function createFile(data) {
  fs.writeFileSync(talker, JSON.stringify(data));
}

module.exports = {
  readFile,
  createFile,
};
