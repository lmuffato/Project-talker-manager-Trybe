const fs = require('fs').promises;

const DIRECTORY = './talker.json';

const editTalker = async ({ name, age, talk, id }) => {
  const talkers = JSON.parse(await fs.readFile(DIRECTORY, 'utf-8'));
  const index = talkers.findIndex((talker) => talker.id === +id);

  const editedTalker = {
    name,
    age,
    id: +id,
    talk,
  };

  talkers.splice(index, 1, editedTalker);

  await fs.writeFile(DIRECTORY, JSON.stringify(talkers));

  return editedTalker;
};

module.exports = editTalker;
