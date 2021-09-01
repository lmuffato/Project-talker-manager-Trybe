const fs = require('fs').promises;

function getTalkers() {
  const talkers = fs
    .readFile('./talker.json', 'utf-8')
    .then((data) => JSON.parse(data));
  return talkers;
}

module.exports = { getTalkers };
