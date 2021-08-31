/* eslint-disable max-lines-per-function */
const fs = require('fs');

const addTalker = (req, res) => {
  const { name, age } = req.body;
  const talk = JSON.parse(req.body.talk);
  const { watchetAt, rate } = talk;

  const talker = JSON.parse(fs.readFileSync('./talker.json', 'UTF-8'));
  const id = talker.length + 1;
  
  const newTalker = {
    id,
    name,
    age,
    talk: {
      watchetAt,
      rate,
    },
  };

  res.status(201).json(newTalker);
};

module.exports = addTalker;