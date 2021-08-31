const fs = require('fs');

const writeFile = (fileName, fileData) => {
  fs.writeFileSync(fileName, JSON.stringify(fileData));
};

module.exports = writeFile;
