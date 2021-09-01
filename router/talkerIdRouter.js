const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const content = await fs.readFile('./talker.json');
  const talker = JSON.parse(content);
  const talkerId = talker.findIndex((t) => t.id === +id);
  if (talkerId === -1) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } else {
    res.status(200).json(talker[talkerId]);
  }
});

module.exports = router;