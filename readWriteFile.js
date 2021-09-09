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

const rewriteContentFile = async (updatedTalker, id) => {
  const talkerList = await readContentFile();
  const filteredTalkerList = talkerList.filter((t) => t.id !== parseInt(id, 10));
  filteredTalkerList.push(updatedTalker);
  await fs.writeFile(TALKER, JSON.stringify(filteredTalkerList));
};

const deleteContentFile = async (id) => {
  const talkerList = await readContentFile();
  const filteredTalkerList = talkerList.filter((t) => t.id !== parseInt(id, 10));
  await fs.writeFile(TALKER, JSON.stringify(filteredTalkerList));
};

module.exports = {
  readContentFile,
  writeContentFile,
  rewriteContentFile,
  deleteContentFile,
};