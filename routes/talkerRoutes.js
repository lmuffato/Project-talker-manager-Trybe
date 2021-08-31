const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

function getTalkers() {
  return fs.readFile('./talker.json').then((result) => JSON.parse(result));
}

router.get('/', async (_req, res) => {
  try {
    const talkers = await getTalkers();
    if (talkers.length === 0) return res.status(200).send([]);
    
    return res.status(200).send(talkers);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const SelectedTalker = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (SelectedTalker) return res.status(200).send(SelectedTalker);

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;