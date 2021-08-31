const express = require('express');
const { readFile } = require('fs').promises;

const router = express.Router();

const getFileData = async (file) => {
  const data = await readFile(file, 'utf-8');
  const results = JSON.parse(data);
  return results;
};

router.get('/', async (_req, res) => {
  try {
    const talkers = await getFileData('talker.json');
    res.status(200).json(talkers);
  } catch (error) {
    res.status(200).json([]);
  }  
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talkers = await getFileData('talker.json');
    const talker = talkers.find((person) => person.id === parseInt(id, 10));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
  } catch (error) {
    res.status(500).end();
  }
});

module.exports = router;
