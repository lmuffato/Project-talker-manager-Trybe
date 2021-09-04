const fs = require('fs').promises;

function getTalkers() {
  const talkers = fs.readFile('./talker.json', 'utf-8');
  return talkers.then((res) => JSON.parse(res));
}

module.exports = getTalkers;
