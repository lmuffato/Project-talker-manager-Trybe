const fs = require('fs').promises;
const getAllTalkers = require('./getAllTalkers');

async function deleteTalker(id) {
  const talkers = await getAllTalkers();
  const newTalkers = talkers.filter((talkerData) => talkerData.id !== id);
  await fs.writeFile('talker.json', JSON.stringify(newTalkers), 'utf8');
}

module.exports = deleteTalker;