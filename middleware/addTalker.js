const fs = require('fs').promises;

const readFile = async () => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = await JSON.parse(data);
  return talkers;
};

const addTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readFile(); 
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };
  const allTalkers = [...talkers, newTalker];
  await fs.writeFile('./talker.json', JSON.stringify(allTalkers));
  return res.status(201).json(newTalker);
};

module.exports = addTalker;
