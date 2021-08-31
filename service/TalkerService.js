const fileSystem = require('fs').promises;

const getTalkers = async (pathFile) => {
  try {
    const talkers = await fileSystem.readFile(pathFile, 'utf-8');
    return JSON.parse(talkers);
  } catch (error) {
    console.error(error);
    throw new Error('Não foi possível ler ou acessar o arquivo de dados');
  }
};

module.exports = { getTalkers };
