const { readFile, writeFile } = require('fs').promises;
const crypto = require('crypto');

const reading = async (file) => {
  let readfile = await readFile(file);
  readfile = JSON.parse(readfile);

  return readfile;
};

function writing(newTalker) {
  return writeFile('./talker.json', JSON.stringify(newTalker));
}

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  reading,
  writing,
  tokenGenerator,
};