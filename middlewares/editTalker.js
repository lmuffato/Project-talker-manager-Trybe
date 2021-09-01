const fs = require('fs');
const talkerNew = require('../services/newTalker');

function verifyIndexIfExists(talker, id) {
  return talker.findIndex((item) => item.id === id);
}

const editTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync('./talker.json', 'UTF-8'));
  const index = verifyIndexIfExists(talker, +id);
  const newTalker = talkerNew(name, age, +id, talk);
 
  if (index !== -1) talker.splice(index, 1);
  talker.push(newTalker);

  fs.writeFileSync('./talker.json', JSON.stringify(talker), 'UTF-8');

  return res.status(200).json(newTalker);
}; 

module.exports = editTalker;
