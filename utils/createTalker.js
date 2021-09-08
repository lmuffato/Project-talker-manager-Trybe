const fs = require('fs').promises;

const DIRECTORY = './talker.json';

const setId = (array) => {
  if (array.length === 0) return 1;

  return array[array.length - 1].id + 1;
};

const createTalker = async ({ name, age, talk }) => {
  const talkers = JSON.parse(await fs.readFile(DIRECTORY, 'utf-8'));

  const newTalker = {
    id: setId(talkers),
    name,
    age,
    talk,
  };
  talkers.push(newTalker);

  await fs.writeFile(DIRECTORY, JSON.stringify(talkers));

  return newTalker;
};

module.exports = createTalker;
