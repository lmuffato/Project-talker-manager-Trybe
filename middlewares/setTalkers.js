const fs = require('fs').promises;

async function setTalker(newFile) {
  const setFile = await fs.writeFile('./talker.json', JSON.stringify(newFile));
  return setFile;
}

module.exports = setTalker;