const fs = require('fs');

const readTalkerList = () => JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

function getTalkerList(_req, res) {
  const talkers = readTalkerList();
  return res.status(200).json(talkers);
}

function getFilteredTalker(req, res) {
  const { id } = req.params;
  const talkers = readTalkerList();
  const filteredTalker = talkers.find((talker) => talker.id === +id);
  console.log(filteredTalker);
  if (filteredTalker === undefined) { 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(filteredTalker);
}

function searchTalkers(req, res) {
  const { q: keyWord } = req.query;
  const talkersList = readTalkerList();
  if (keyWord === undefined || keyWord === '') {
    return res.status(200).json(talkersList);
  }
  const filteredTalkers = talkersList.filter((talker) => talker.name.includes(keyWord));
  return res.status(200).json(filteredTalkers);
}

module.exports = { getFilteredTalker, getTalkerList, searchTalkers };