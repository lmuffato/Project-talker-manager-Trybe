const express = require('express');
const getTalkers = require('../services/getTalkers');
const getTalkersById = require('../services/getTalkerById');
const postNewTalker = require('../services/postNewTalker');
const validateNewTalker = require('../middlewares/newTalkerAuth');

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

router.post('/', validateNewTalker, async (req, res) => {
  const { body } = req;
  console.log(body);
  const newTalker = await postNewTalker(body);
  return res.status(201).json(newTalker);
});

module.exports = router;
