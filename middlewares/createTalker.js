const fs = require('fs').promises;

function generateValidId(talkers) {
  const arrayOfIds = talkers.map(({ id }) => id);
  return Math.max(...arrayOfIds) + 1;
}

const createTalker = async (req, res) => {
  const {
    name,
    age,
    talk,
  } = req.body;

  const { talkers } = req;
  const id = generateValidId(talkers);
  const talker = { name, age, id, talk };
  const newTalkers = JSON.stringify([...talkers, talker]);
  await fs.writeFile('./talker.json', newTalkers, 'utf-8');

  res.status(201).json(talker);
};

module.exports = { createTalker };