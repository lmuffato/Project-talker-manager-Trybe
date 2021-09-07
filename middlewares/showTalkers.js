const readJson = require('./readJson');

async function showTalkers(_req, res) {
  try {
    const resp = await readJson();
    if (!resp) return res.status(500).json({ message: 'no data found' });
    res.status(200).json(JSON.parse(resp));
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

module.exports = showTalkers;
