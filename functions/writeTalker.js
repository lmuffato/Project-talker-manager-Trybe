const fs = require('fs').promises;
const { TALKERS_FILE } = require('./getTalkers');

// Ler o conteúdo do arquivo
const writeTalker = async (newDatabase) => {
  try {
    fs.writeFile(TALKERS_FILE, newDatabase);
  } catch (error) {
    return ({ message: error.message });
  }
};

module.exports = { writeTalker };
