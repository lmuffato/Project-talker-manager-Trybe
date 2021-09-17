const fs = require('fs').promises;

module.exports = async (fileName) => {
  try {
    const data = await fs.readFile(fileName, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return console.error(`Got an error trying to read the file: ${error.message}`);
  }
};
