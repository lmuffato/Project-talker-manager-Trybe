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

const deleteTalker = async (req, res) => {
  const talker = await palestrante();
  const intId = parseInt(req.params.id, 10);
  const talkerDeletId = talker.findIndex(({ id }) => id === intId);
  if (talkerDeletId === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  }
  const talkerDelete = talker.splice(talkerDeletId, 1)[0];
  console.log(deleteTalker);
  await fs.writeFile('talker.json', JSON.stringify(talkerDelete));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = { addTalker, editTalker, deleteTalker };
