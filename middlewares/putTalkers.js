const { readFile, writeFile } = require('fs').promises;

const talkerUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = JSON.parse(await readFile('talker.json', 'utf-8'));
  const filterTalker = talkers.filter((talker) => talker.id !== parseInt(id, 10));
  const editedTalker = { name, age, talk, id: Number(id) };

  filterTalker.push(editedTalker);

  await writeFile('talker.json', JSON.stringify(filterTalker));

  return res.status(200).json(editedTalker);
};

module.exports = talkerUpdate;