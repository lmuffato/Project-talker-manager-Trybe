const fs = require('fs').promises;

const addTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(data);
  const talker = { id: talkers.length + 1, name, age, talk };
  talkers.push(talker);
  await fs.writeFile('talker.json', JSON.stringify(talkers));

  res.status(201).json(talker);
};

module.exports = addTalker;
