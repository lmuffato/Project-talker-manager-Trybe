const { readFile } = require('fs').promises;

const getTalkers = () => {
  const toReturn = readFile('./talker.json', 'utf-8')
    .then((content) => JSON.parse(content))
    .catch((e) => e.message);
  return toReturn;
};

module.exports = getTalkers;