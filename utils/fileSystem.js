const fs = require('fs').promises;

function getTalker() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

async function setTalker(newFile) {
  const setFile = await fs.writeFile('./talker.json', JSON.stringify(newFile));
  return setFile;
}

module.exports = { getTalker, setTalker };