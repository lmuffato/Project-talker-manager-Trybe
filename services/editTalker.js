const fs = require('fs').promises;
const getAllTalkers = require('./getAllTalkers');

async function editTalker(id, newData) {
  const talkers = await getAllTalkers();
  const newList = talkers.map((talkerData) => {
    if (talkerData.id === id) {
      return { id, ...newData };
    }
    return talkerData;
  });
  await fs.writeFile('talker.json', JSON.stringify(newList), 'utf8');
  return { id, ...newData };
}

module.exports = editTalker;