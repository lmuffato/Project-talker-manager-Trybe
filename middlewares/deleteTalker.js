// 6 - Crie o endpoint DELETE /talker/:id

const { readFileSync, writeFileSync } = require('fs');

const { validateToken } = require('../services');

const deleteTalker = (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const isValidToken = validateToken(authorization);
  
  if (!isValidToken.ok) { 
    return res.status(isValidToken.status).json({ message: isValidToken.message });
  }

  const talkers = JSON.parse(readFileSync('talker.json'));
  const deleteTalkers = talkers.filter((talker) => talker.id !== +id);
  talkers.push(deleteTalkers);
  writeFileSync('talker.json', JSON.stringify(deleteTalkers));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
