const fs = require('fs').promises;

const getTalkerFile = async () => {
  const talkerFile = await fs.readFile('./talker.json', 'utf-8');

  const talkerContent = JSON.parse(talkerFile);

  return talkerContent;
};

const setNewTalker = async (newTalker) => {
  // const talkerFile = await getTalkerFile();
  // talkerFile.push(newTalker);

  fs.writeFile('./talker.json', JSON.stringify(newTalker));
};

const setUpdate = (newTalker) => {
  fs.writeFile('./talker.json', JSON.stringify(newTalker));
};

module.exports = {
  getTalkerFile,
  setNewTalker,
  setUpdate,
};
