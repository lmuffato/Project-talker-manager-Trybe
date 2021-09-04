const rescue = require('express-rescue');
const fs = require('fs').promises;
const setTalkers = require('./setTalkers');

const deleteTalker = rescue(async (req, res) => {
  const { id } = req.params;

  const talkers = await fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));

  const filterTalker = talkers.filter((talker) => talker.id !== Number(id));

  await setTalkers(filterTalker);

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = deleteTalker;