const fs = require('fs/promises');

const conn = async () => {
  const doc = await fs.readFile('./talker.json', 'utf-8');
  return doc;
};

module.exports = { conn };