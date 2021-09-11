const fs = require('fs').promises;

// Não deve especificar o caminho do arquivo no fs.readFile.
const TALKERS_FILE = 'talker.json';

// Ler o conteúdo do arquivo
const getTalkers = async () => {
  try {
    const talkers = await fs.readFile(TALKERS_FILE, 'utf-8');
    const parsedTalkers = JSON.parse(talkers); // converte de json para objeto
    return parsedTalkers;
  } catch (error) {
    return ({ message: error.message });
  }
};

module.exports = { getTalkers, TALKERS_FILE };
