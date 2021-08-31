const { readFile, writeFile } = require('fs').promises;

const talkerCreation = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = JSON.parse(await readFile('talker.json', 'utf-8'));
  const newTalker = {
    name,
    age,
    talk,
    id: talkers.length + 1,
  };

  talkers.push(newTalker);

  await writeFile('talker.json', JSON.stringify(talkers));

  return res.status(201).json(newTalker);
};

module.exports = talkerCreation;
