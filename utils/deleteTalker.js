const fs = require('fs').promises;

const DIRECTORY = './talker.json';

const deleteTalker = async (id) => {
  const talkers = JSON.parse(await fs.readFile(DIRECTORY, 'utf-8'));
  const index = talkers.findIndex((talker) => talker.id === +id);

  talkers.splice(index, 1);

  return fs.writeFile(DIRECTORY, JSON.stringify(talkers));
};

module.exports = deleteTalker;
