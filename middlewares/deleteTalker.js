const fsAsync = require('fs').promises;
const readJson = require('./readJson');

async function deleteTalker(req, res) {
  try {
    const { id } = req.params;
    const talkers = await readJson();
    const parseTalkers = JSON.parse(talkers);
    const index = parseTalkers.findIndex((e) => e.id === parseInt(id, 10));
    if (index === -1) return res.status(404).json({ message: 'not found' });
    parseTalkers.splice(index, 1);
    await fsAsync.writeFile('./talker.json', JSON.stringify(parseTalkers));
    return res.status(201).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = deleteTalker;
