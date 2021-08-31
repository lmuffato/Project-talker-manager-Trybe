const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile('talker.json', 'utf-8');
    const talkers = JSON.parse(data);
    res.status(200).json(talkers);
  } catch (e) {
    console.error(`Erro: ${e}`);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile('talker.json', 'utf-8');
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === parseInt(id, 0));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

module.exports = router;