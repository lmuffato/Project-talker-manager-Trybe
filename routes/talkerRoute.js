const express = require('express');
const getTalkers = require('../services/getTalkers');
const getTalkersById = require('../services/getTalkerById');
const postNewTalker = require('../services/postNewTalker');
const deleteTalker = require('../services/deleteTalker');
const putTalker = require('../services/putTalker');
const validateToken = require('../middlewares/tokenAuthMiddle');
const validateTalker = require('../middlewares/newTalkerAuth');

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

router.post('/', validateTalker, async (req, res) => {
  const { body } = req;
  const newTalker = await postNewTalker(body);
  return res.status(201).json(newTalker);
});

router.put('/:id', validateTalker, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedTalker = await putTalker(body, id);
  return res.status(200).json(updatedTalker);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  return res.status(200).json({
    message: 'Pessoa palestrante deletada com sucesso',
  });
});

module.exports = router;
