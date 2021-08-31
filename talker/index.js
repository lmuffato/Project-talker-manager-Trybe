const express = require('express');
const { readFile } = require('fs').promises;

const router = express.Router();

const readTalkersList = async (fileName) => {
  try {
    const data = await readFile(fileName, 'utf-8');
    const talkersList = await JSON.parse(data);
    return talkersList;
  } catch (e) {
    return e;
  }
};

router.get('/', async (_req, res) => {
  try {
    const talkersList = await readTalkersList('./talker.json');
    res.status(200).json(talkersList);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let talkersList = [];
  try {
    talkersList = await readTalkersList('./talker.json');
  } catch (e) {
    res.status(400).json({ message: e.message });
  }

  const talker = talkersList.find((person) => person.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});
module.exports = router;
