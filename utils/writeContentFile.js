const fs = require('fs').promises;
const readContentFile = require('./readContentFile');

const writeContentFile = async (path, content) => {
  const talkersArray = await readContentFile(path);

  talkersArray.push(content);

  try {
    await fs.writeFile(path, JSON.stringify(talkersArray));
    return content;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

module.exports = writeContentFile;
