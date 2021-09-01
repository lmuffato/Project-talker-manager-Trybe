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

const escreverDados = async (novosDados) => 
fs.writeFile('./talker.json', JSON.stringify(novosDados));

module.exports = {
  lerDados,
  escreverDados,
};
