const fs = require('fs');

const readFile = () => {
  const file = fs.readFile('./talker.json', 'utf-8');
  return file.then((data) => JSON.parse(data));
};

module.exports = readFile;