const express = require('express');

const router = express.Router();

const { readFileSync } = require('../middleware/readFile');

router.get('/', async (request, response) => {
  const talkers = await readFileSync('./talker.json');

  if (!talkers.length) {
    return response.status(200).json([]);
  }

  return response.status(200).json(talkers);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await readFileSync('./talker.json');

  const talkerById = await talkers.find((talker) => talker.id === Number(id));

  if (!talkerById) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return response.status(200).json(talkerById);
});

module.exports = router;
