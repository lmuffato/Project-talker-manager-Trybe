const fs = require('fs').promises;

const conn = async () => {
  const doc = await fs.readFile('./talker.json', 'utf-8');
  const file = doc.length !== 0 ? JSON.parse(doc) : [];
  return file;
};

module.exports = conn;
