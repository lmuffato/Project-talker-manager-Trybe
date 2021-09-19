const fs = require('fs').promises;

async function getAllTalkers() {
  const data = await fs.readFile('talker.json');
  return JSON.parse(data);
}

module.exports = getAllTalkers;