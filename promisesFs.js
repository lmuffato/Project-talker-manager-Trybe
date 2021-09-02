const fs = require('fs').promises;
const crypto = require('crypto');

function readFile() {
  const talkers = fs.readFile('./talker.json', 'utf-8');
  return talkers.then((data) => JSON.parse(data));
}

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function writeFileTalker(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

module.exports = { readFile, generateToken, writeFileTalker };
