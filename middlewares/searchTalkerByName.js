const fsAsync = require('fs').promises;

async function searchTalkerByName(req, res) {
  try {
    const { name } = req.query;
    const resp = await fsAsync.readFile('./talker.json', 'utf-8');
    const respJson = JSON.parse(resp);
    const talkers = respJson.filter((e) => e.name.includes(toString(name)));
    if (!talkers) return res.status(401).json({ message: 'Token não encontrado' });
    res.status(200).json(talkers);
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = searchTalkerByName;
