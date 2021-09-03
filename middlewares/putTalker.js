const fs = require('fs').promises;

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(data);
  const newTalker = { id: Number(id), name, age, talk };
  const editedTalkers = talkers.filter((talker) => Number(talker.id) !== Number(id));
  editedTalkers.push(newTalker);
  await fs.writeFile('talker.json', JSON.stringify(editedTalkers));
  return res.status(200).json(newTalker);
};

module.exports = editTalker;
