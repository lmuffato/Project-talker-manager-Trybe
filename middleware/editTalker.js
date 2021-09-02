const fs = require('fs').promises;

const readFile = async () => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = await JSON.parse(data);
  return talkers;
};

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkers = await readFile();
  const editedTalker = {
    id: Number(id),
    name,
    age,
    talk,
  };
  const filterTalker = talkers.filter((talker) => talker.id !== Number(id));
  const allTalkers = [...filterTalker, editedTalker];
  await fs.writeFile('./talker.json', JSON.stringify(allTalkers));
  return res.status(200).json(editedTalker);
};

module.exports = editTalker;