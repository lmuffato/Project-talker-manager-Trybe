const readJson = require('./readJson');

async function searchTalkerByName(req, res) {
  try {
    const { name } = req.query;
    const resp = await readJson();
    if (!name || name === '') return res.status(200).json(JSON.parse(resp));
    const talkers = resp.filter((e) => e.name.includes(toString(name)));
    if (talkers) return res.status(200).json(talkers);
    return res.status(200).json([]);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = searchTalkerByName;
