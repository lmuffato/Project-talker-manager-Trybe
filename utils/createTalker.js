const fs = require('fs').promises;

const DIRECTORY = './talker.json';

const createTalker = async ({ name, age, talk }) => {
  const talkers = JSON.parse(await fs.readFile(DIRECTORY, 'utf-8'));

  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  talkers.push(newTalker);

  await fs.writeFile(DIRECTORY, JSON.stringify(talkers));

  return newTalker;
};

module.exports = createTalker;
