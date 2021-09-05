// 4 - Crie o endpoint POST /talker

const { readFile, writeFile } = require('fs').promises;
const { validateCreateTalker, generateToken } = require('../services');

const createTalker = (req, res) => {
  const { name, age, talker } = req.body;
  const { authorization } = req.header;

  const isValidCreateTalker = validateCreateTalker(name, age, talker);
  const isToken = generateToken(authorization);

  if (!isValidCreateTalker.ok) {
    return res.status(isValidCreateTalker.status).json({ message: isValidCreateTalker.message });
  }
  if (!isToken.ok) {
    return res.status(isToken.status).json({ message: isToken.message });
  }

  const talkers = JSON.parse(readFile('talker.json'));
  const newTalker = { id: talkers.length + 1, name, age, talker };
  talkers.push(newTalker);
  writeFile('talker.json', JSON.stringify(talkers));
  return res.status(201).json(newTalker);
};

module.exports = createTalker;
