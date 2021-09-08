const fs = require('fs').promises;

const DIRECTORY = './talker.json';

const searchByQuery = async (search) => {
  const talkers = JSON.parse(await fs.readFile(DIRECTORY, 'utf-8'));

  if (!search) {
    return talkers;
  }

  const result = talkers.filter((talker) => talker.name.includes(search));

  return result;
};

module.exports = searchByQuery;
