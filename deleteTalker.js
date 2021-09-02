const { readFile, writeFile } = require('fs').promises;

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await readFile('talker.json', 'utf-8'));
  const filteredTalkers = talkers.filter((r) => r.id !== parseInt(id, 10));
  await writeFile('talker.json', JSON.stringify(filteredTalkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;