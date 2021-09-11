const fs = require('fs').promises;

module.exports = async (filePath) => {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (error) {
    return console.error(`Got an error trying to read the file: ${error.message}`);
  }
};
