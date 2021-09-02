const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const getStuff = (file) => {
    return readFile(file);
  }

module.exports = getStuff;