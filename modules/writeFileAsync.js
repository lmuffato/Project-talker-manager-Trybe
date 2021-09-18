const fs = require('fs').promises;

module.exports = async (fileName, data) => {
  try {
    await fs.writeFile(fileName, data, { enconding: 'utf-8', flags: 'w' });
    return { message: 'Palestrante incluído com sucesso!' };
  } catch (err) {
    return console.error(`Got an error trying to write the file: ${err.message}`);
  }
};
