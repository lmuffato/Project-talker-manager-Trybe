const fs = require('fs').promises;

const createTalkers = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  talkers.push(newTalker);
  await fs.writeFile('talker.json', JSON.stringify(talkers));
  return res.status(201).json(newTalker);
};

module.exports = createTalkers;