const readJson = require('./readJson');

async function showTalkerById(req, res) {
  try {
    const { id } = req.params;
    const resp = await readJson();
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
