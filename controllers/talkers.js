const fs = require('fs').promises;

const palestrante = async () => {
  const talker = await fs.readFile('talker.json', 'utf-8');
  return JSON.parse(talker);
};

const addTalker = async (req, res) => {
  const { body } = req;
  const talker = await palestrante();
  const newTalker = ({ id: talker.length + 1, ...body });
  await fs.writeFile('talker.json', JSON.stringify([...talker, newTalker]));
  res.status(201).json(newTalker);
};

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const intId = parseInt(id, 10);
  const talker = await palestrante();
  const newTalker = ({ id: intId, ...body });
  await fs.writeFile('talker.json', JSON.stringify([...talker, newTalker]));
  res.status(200).json(newTalker);
};

module.exports = { addTalker, editTalker };
