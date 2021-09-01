const { readFile, writeFile } = require('fs').promises;

const delTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await readFile('talker.json', 'utf-8'));
  const filteredTalkers = talkers.filter((tlkr) => tlkr.id !== parseInt(id, 10));

  await writeFile('talker.json', JSON.stringify(filteredTalkers));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = delTalker;
