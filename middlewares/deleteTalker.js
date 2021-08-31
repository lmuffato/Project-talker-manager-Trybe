const { readFile, writeFile } = require('fs').promises;

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  let talkers;
  try {
    talkers = JSON.parse(await readFile('talker.json', 'utf-8'));
  } catch (error) {
    console.error(error);
  }
  const filtredTalkers = talkers.filter((t) => t.id !== parseInt(id, 10));

  await writeFile('talker.json', JSON.stringify(filtredTalkers));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
