const fs = require('fs').promises;
const crypto = require('crypto');

const TALKERS = 'talker.json';

const readFiles = async () => {
  const talkers = await fs.readFile(TALKERS, 'utf-8');
  const parsedTalkers = JSON.parse(talkers);
  return parsedTalkers;
};

const writeFiles = async (newTalker) => {
  const write = await fs.writeFile(TALKERS, JSON.stringify(newTalker));
  return write;
};

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  readFiles,
  tokenGenerator,
  writeFiles,
};