const fs = require('fs').promises;
const crypto = require('crypto');

const TALKERS = 'talker.json';

const readFiles = async () => {
  const talkers = await fs.readFile(TALKERS, 'utf-8');
  const parsedTalkers = JSON.parse(talkers);
  return parsedTalkers;
};

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  readFiles,
  tokenGenerator,
};