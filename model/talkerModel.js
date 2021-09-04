const fs = require('fs/promises');

async function getAllTalkers() {
  const allTalkers = await fs.readFile('./talker.json');
  return JSON.parse(allTalkers);
}

module.exports = {
  getAllTalkers,
};