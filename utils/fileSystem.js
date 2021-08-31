const fs = require('fs/promises');

function getTalker() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

function setTalker(newSimpsons) {
  return fs.writeFile('./talker.json', JSON.stringify(newSimpsons));
}

module.exports = { getTalker, setTalker };