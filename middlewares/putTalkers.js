const { readFile, writeFile } = require('fs').promises;

const editTalkers = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = JSON.parse(await readFile('talker.json', 'utf-8'));
  const filteredTalkers = talkers.filter((tlkr) => tlkr.id !== parseInt(id, 10));

  const editedTalker = { name, age, talk, id: Number(id) };

  filteredTalkers.push(editedTalker);

  await writeFile('talker.json', JSON.stringify(filteredTalkers));

  return res.status(200).json(editedTalker);
};

module.exports = editTalkers; 
