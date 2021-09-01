const fs = require('fs').promises;

function persistFile(file) {
  return fs.writeFile('./talker.json', JSON.stringify(file), 'utf-8');
}

module.exports = { persistFile };