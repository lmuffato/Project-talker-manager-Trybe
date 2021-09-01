const fs = require('fs').promises;

async function readJsonReturnArray(file) {
    const RAWDATA = await fs.readFile(file);
    const DATA = await JSON.parse(RAWDATA);
    return (DATA);
}

module.exports = {
  readJsonReturnArray,
};
