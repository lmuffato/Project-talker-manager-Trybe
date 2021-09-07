const getToken = require('./getToken');

async function createLogin(_req, res) {
  try {
    return res.status(200).json(getToken());
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = createLogin;
