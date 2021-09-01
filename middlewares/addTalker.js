/* eslint-disable max-lines-per-function */
const fs = require('fs');

const addTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;

  const talker = JSON.parse(fs.readFileSync('./talker.json', 'UTF-8'));
  
  const newTalker = {
    name,
    age,
    id: talker.length + 1,
    talk: { watchedAt, rate },
  };

  talker.push(newTalker);

  fs.writeFileSync('./talker.json', JSON.stringify(talker), 'UTF-8');

  return res.status(201).json(newTalker);
};

module.exports = addTalker;