const fs = require('fs');
const talkerNew = require('../services/newTalker');

const addTalker = (req, res) => {
  const { name, age, talk } = req.body;

  const talker = JSON.parse(fs.readFileSync('./talker.json', 'UTF-8'));
  const id = talker.length + 1;

  const newTalker = talkerNew(name, age, id, talk);

  talker.push(newTalker);

  fs.writeFileSync('./talker.json', JSON.stringify(talker), 'UTF-8');

  return res.status(201).json(newTalker);
};

module.exports = addTalker;