const fs = require('fs').promises;

const readContentFile = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

module.exports = readContentFile;
