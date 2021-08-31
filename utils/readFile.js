const fs = require('fs');

const readFile = (fileName) => {
  try {
    return JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = readFile;
