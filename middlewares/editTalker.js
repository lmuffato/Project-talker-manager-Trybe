// 5 - Crie o endpoint PUT /talker/:id

const { readFileSync, writeFileSync } = require('fs');

const { validateToken, validateCreateTalker } = require('../services');

const editTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;
  const { id } = req.params;
  const isValidToken = validateToken(authorization);
  const isValidCreateTalker = validateCreateTalker(name, age, talk);
  if (!isValidToken.ok) { 
    return res.status(isValidToken.status).json({ message: isValidToken.message });
  }

  if (!isValidCreateTalker.ok) { 
    return res.status(isValidCreateTalker.status).json({ message: isValidCreateTalker.message });
  }
  const talkers = JSON.parse(readFileSync('talker.json'));
  const editedTalker = { id: +id, name, age, talk };
  const filterTalkers = talkers.filter((talker) => talker.id !== +id);
  filterTalkers.push(editedTalker);
  writeFileSync('talker.json', JSON.stringify(filterTalkers));
  return res.status(200).json(editedTalker);
};

module.exports = editTalker;
