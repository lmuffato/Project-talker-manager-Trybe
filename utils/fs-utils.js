const fs = require('fs');

function getData() {
  return JSON.parse(fs.readFileSync('talker.json', 'utf8'));
}

function writeData(data) {
  fs.writeFileSync('talker.json', JSON.stringify(data));
}

module.exports = {
  getData,
  writeData,
};
