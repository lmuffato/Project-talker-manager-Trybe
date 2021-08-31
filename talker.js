const express = require('express');
const { readFileSync } = require('fs');

const router = express.Router();

const readTalkerFile = () => {
  const talkersList = readFileSync('./talker.json');
  const data = JSON.parse(talkersList);

  return data;
};

router.get('/', (_req, res) => {
  try {
    const talkers = readTalkerFile();
    return res.status(200).json(talkers);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const talkers = readTalkerFile();
    
    const talkerById = talkers.find((talker) => talker.id === Number(id));
    
    if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
    return res.status(200).json(talkerById);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
