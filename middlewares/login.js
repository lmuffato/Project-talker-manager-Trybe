const randonCode = require('../services/randonCode');

function geraToken(_req, res) {
  const token = randonCode();
  res.status(200).json({ token });
}
