const fs = require('fs').promises;

async function getTalkerList(_req, res) {
  const talkers = await fs.readFile('./talker.json', 'utf8')
    .then((response) => JSON.parse(response))
    .catch((err) => console.log(err.message));
  return res.status(200).json(talkers);
}

async function getFilteredTalker(req, res) {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf8')
    .then((response) => JSON.parse(response))
    .catch((err) => console.log(err.message));
  const filteredTalker = talkers.find((talker) => talker.id === +id);
  console.log(filteredTalker);
  if (filteredTalker === undefined) { 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(filteredTalker);
}

module.exports = { getFilteredTalker, getTalkerList };