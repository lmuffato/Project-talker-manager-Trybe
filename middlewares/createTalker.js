const { readFileSync, writeFileSync } = require('fs');
const { validateToken, validateCreateTalker } = require('../services');

const createTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;
  const validToken = validateToken(authorization);
  const validTalker = validateCreateTalker(name, age, talk);

  if (!validToken.ok) {
    return res.status(validToken.status).json({ message: validToken.message });
  }
  if (!validTalker.ok) {
    return res.status(validTalker.status).json({ message: validTalker.message });
  }

  const talkers = JSON.parse(readFileSync('talker.json', 'utf-8'));
  const newTalker = { id: talkers.length + 1, name, age, talk };
  talkers.push(newTalker);
  writeFileSync('talker.json', JSON.stringify(talkers));
  return res.status(201).json(newTalker);
};

module.exports = createTalker;
