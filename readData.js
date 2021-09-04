const fs = require('fs').promises;

async function getAllTalkers() {
  try {
    const fetchData = await fs.readFile('./talker.json', 'utf-8');
    const data = JSON.parse(fetchData);
    return data;
  } catch (error) {
    console.error(`Erro: ${error.message}`);
  }
}

async function editData(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

module.exports = {
  editData,
  getAllTalkers,
};
