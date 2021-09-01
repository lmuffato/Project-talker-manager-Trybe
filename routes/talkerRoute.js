const express = require('express');
const getTalkers = require('../services/getTalkers');
const getTalkersById = require('../services/getTalkerById');

const router = express.Router();

router.get('/', async (_req, res) => {
  const sendJson = await getTalkers();
  console.log(sendJson);
  return res.status(200).json(sendJson);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkersById(id);
  console.log(talker);
  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(200).json(talker);
});

module.exports = router;
