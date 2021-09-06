const fs = require('fs').promises;

const loadTalkers = require('./loadTalkers');

const FILEPATH = './talker.json';

const editTalker = async (req, res) => {
  const { id } = await req.params;
  const { name, age, talk } = await req.body;
  const talkers = await loadTalkers(); 
  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 8));

  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };

  const newTalkers = talkers.filter((t) => t.id !== parseInt(id, 8));

  newTalkers.push(talkers[talkerIndex]);
  await fs.writeFile(FILEPATH, JSON.stringify(newTalkers), (error) => { if (error) throw error; });

  return res.status(200).json(talkers[talkerIndex]);
};

module.exports = editTalker;