const { readFile, writeFile } = require('fs').promises;

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = JSON.parse(await readFile('talker.json', 'utf-8'));
  const filteredTalkers = talkers.filter((r) => r.id !== parseInt(id, 10));
  const editedTalker = { name, age, talk, id: Number(id) };
  filteredTalkers.push(editedTalker);
  await writeFile('talker.json', JSON.stringify(filteredTalkers));
  res.status(200).json(editedTalker);
};

module.exports = editTalker;