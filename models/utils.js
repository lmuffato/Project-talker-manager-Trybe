const { readFile, writeFile } = require('fs').promises;

const readFileTalker = () => readFile('./talker.json', 'utf-8')
  .then((data) => JSON.parse(data));

const writeFileTalker = (newData) => writeFile('./talker.json', JSON.stringify(newData));

module.exports = {
  readFileTalker,
  writeFileTalker,
};
