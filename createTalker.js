const { writeFile, readFile } = require('fs').promises;

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = JSON.parse(await readFile('talker.json', 'utf-8'));
  const newTalker = {
    name,
    age,
    talk,
    id: talker.length + 1,
  };
  talker.push(newTalker);
  await writeFile('talker.json', JSON.stringify(talker));
  res.status(201).json(newTalker);
};

module.exports = createTalker;