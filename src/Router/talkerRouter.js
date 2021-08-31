const { Router } = require('express');
const fs = require('fs/promises');

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile('talker.json', 'utf-8');
    const talker = JSON.parse(data);
    res.status(200).json(talker);
  } catch (e) {
    console.error(`Erro: ${e}`);
  }
});

module.exports = router;