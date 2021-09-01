const fs = require('fs').promises;

const TALKER_NOT_FOUND = { message: 'não existe palestrante com este ID cadastrado' };

function checkIfidExists(talkers, id) {
  return talkers.some((talker) => Number(talker.id) === id);
}

function persistUpdatedTalker(file) {
  return fs.writeFile('./talker.json', JSON.stringify(file), 'utf-8');
}

const updateTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;

  const { talkers } = req;
  const parsedId = Number(id);

  if (!checkIfidExists(talkers, parsedId)) {
    return res.status(400).send(TALKER_NOT_FOUND);
  }

  const updatedTalker = { parsedId, name, age, talk };

  const arrayWithoutOldTalker = talkers.filter((talker) => talker.id !== parsedId);
  arrayWithoutOldTalker.push(updatedTalker);
  await persistUpdatedTalker(arrayWithoutOldTalker);

  res.status(200).json(updatedTalker);
};

module.exports = { updateTalker };