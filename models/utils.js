const { readFile } = require('fs').promises;

const readFileTalker = () => readFile('./talker.json', 'utf-8')
  .then((data) => JSON.parse(data));

module.exports = {
  readFileTalker,
};
