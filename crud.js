const fs = require('fs').promises;

const lerDados = async () => {
  try {
    const promiseData = await fs.readFile('./talker.json', 'utf-8');
    const dados = JSON.parse(promiseData);
    return dados;
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

module.exports = {
  lerDados,
};
