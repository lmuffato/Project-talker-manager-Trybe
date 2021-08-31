const { readFile, writeFile } = require('fs').promises;

const updateTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = JSON.parse(await readFile('talker.json', 'utf-8'));
  const filtredTalkers = talkers.filter((t) => t.id !== parseInt(id, 10));
  
  const editedTalker = { name, age, talk, id: Number(id) };

  filtredTalkers.push(editedTalker);

  await writeFile('talker.json', JSON.stringify(filtredTalkers));
  
  return res.status(200).json(editedTalker);
};

module.exports = updateTalker;