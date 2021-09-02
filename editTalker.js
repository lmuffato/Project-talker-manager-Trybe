const { readFile, writeFile } = require('fs').promises;

const talkersArchive = () => readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await talkersArchive();
  const filteredTalkers = talkers.find((r) => r.id !== parseInt(id, 10));
  const editedTalker = { name, age, talk, id: Number(id) };
  filteredTalkers.push(editedTalker);
  await writeFile('talker.json', JSON.stringify(talkers));
  return res.status(200).json(editedTalker);
};

module.exports = editTalker;