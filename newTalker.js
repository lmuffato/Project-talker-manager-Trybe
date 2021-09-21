const fs = require('fs');

const newTalker = async (req, res) => {
  const json = './talker.json';
  const { name, age, talk } = req.body;

  const talkerArray = JSON.parse(await fs.promises.readFile(json));
  const newTalkerToAdd = {
        id: talkerArray.length + 1, name, age, talk,
  };

  talkerArray.push(newTalkerToAdd);
  await fs.writeFile(json, JSON.stringify(talkerArray));

  res.status(201).json(newTalkerToAdd);
  };

  module.exports = newTalker;