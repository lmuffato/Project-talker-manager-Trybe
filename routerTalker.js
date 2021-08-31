const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (_req, res) => {
  try {
    const talker = await fs.readFile('./talker.json', 'utf8');
    res.status(200).json(JSON.parse(talker));
  } catch (err) {
    res.status(500).send(err.message);
  } 
});

router.get('/:id', async (req, res) => {
  const talker = await fs.readFile('./talker.json', 'utf8');
  const { id } = req.params;
  const people = JSON.parse(talker).find((p) => p.id === +id);
  
  if (!people) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(people);
});
    
module.exports = router;