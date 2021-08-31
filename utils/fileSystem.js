const fs = require('fs/promises');

function getFile () {
  return fs.readFile('./talker.json', 'utf-8')
    .then(fileContent => JSON.parse(fileContent));
}

function setFile (newSimpsons) {
  return fs.writeFile('./talker.json', JSON.stringify(newSimpsons));
}

module.exports = { getFile, setFile };