// 7 - Crie o endpoint GET /talker/search?q=searchTerm

const fs = require('fs');
const { validateToken } = require('../services');

const searchTalker = (req, res) => {
  const { talker } = req.query;
  const { authorization } = req.headers;
  const isValidToken = validateToken(authorization);

  if (!isValidToken.ok) {
    return res.status(isValidToken.status).json({ message: isValidToken.message });
  }

  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

  if (!talker) { return res.status(200).json(talkers); }

  const filteredTalker = talkers.filter((person) => person.name === talker);

  if (!filteredTalker.length) { return res.status(200).json({ message: [] }); }
  if (filteredTalker.length) { return res.status(200).json(filteredTalker); }
};

module.exports = searchTalker;
