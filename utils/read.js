const fs = require('fs').promises;

async function readJsonReturnArray(file) {
  try {
    const RAWDATA = await fs.readFile(file);
    const DATA = await JSON.parse(RAWDATA);
    return (DATA);
  } catch (err) {
    console.log(err);
    return [{ message: err }];
  }
}

module.exports = {
  readJsonReturnArray,
};
