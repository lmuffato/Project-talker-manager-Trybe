const fs = require('fs').promises;

const TALKER = './talker.json';

const readContentFile = async () => {
    const talker = await fs.readFile(TALKER, 'utf8');
    const talkerList = JSON.parse(talker);
    return talkerList;
};

const writeContentFile = async (newTalker) => {
    const talkerList = await readContentFile();
    talkerList.push(newTalker);
    await fs.writeFile(TALKER, JSON.stringify(talkerList));
};

module.exports = {
  readContentFile,
  writeContentFile,
};