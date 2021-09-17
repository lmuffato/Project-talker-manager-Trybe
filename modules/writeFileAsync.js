const fs = require('fs').promises;

module.exports = async (fileName, newTalk) => {
  try {
    await fs.writeFile(fileName, newTalk);
    return { message: 'Incluído com sucesso!' };
  } catch (err) {
    return console.error(`Got an error trying to write the file: ${err.message}`);
  }
};
