const fs = require('fs').promises;
const getAllTalkers = require('./getAllTalkers');

async function createTalker(talker) {
  const data = await getAllTalkers();
  const { id } = data[data.length - 1];
  const newTalkerData = { id: id + 1, ...talker };
  data.push(newTalkerData);
  await fs.writeFile('talker.json', JSON.stringify(data), 'utf8');
  return newTalkerData;
}

module.exports = createTalker;