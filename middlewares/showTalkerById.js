const fsAsync = require('fs').promises;

async function showTalkerById(req, res) {
  try {
    const { id } = req.params;
    const resp = await fsAsync.readFile('./talker.json', 'utf-8');
    const respJson = JSON.parse(resp);
    const filteredTalker = respJson.find((e) => e.id === parseInt(id, 10));
    if (!filteredTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(filteredTalker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = showTalkerById;
