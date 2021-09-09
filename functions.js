const fs = require('fs').promises;

const TALKER = './talker.json';

const createToken = () => {
  const random1 = Math.random().toString(36).substr(2, 8);
  const random2 = Math.random().toString(36).substr(2, 8);
  const token = `${random1}${random2}`;
  return token;
 };

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

const searchIdContentFile = async (id) => {
  const talkerList = await readContentFile();
  const talkerById = talkerList.find((t) => t.id === parseInt(id, 10));
  return talkerById;
};
 
const updateContentFile = async (updatedTalker, id) => {
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

const searchTextContentFile = async (q) => {
  const talkerList = await readContentFile();
  const filteredTalkerList = talkerList.filter(({ name }) => name.includes(q));
  return filteredTalkerList;
};

module.exports = {
  createToken,
  readContentFile,
  writeContentFile,
  updateContentFile,
  deleteContentFile,
  searchTextContentFile,
  searchIdContentFile,
};