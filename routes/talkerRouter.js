const express = require('express');

const parsedData = require('../utils/parseData');
const getById = require('../utils/getTalkerById');
const createTalker = require('../utils/createTalker');
const validations = require('../middlewares/validations');
const editTalker = require('../utils/editTalker.js.JS');
const deleteTalker = require('../utils/deleteTalker');
const tokenValidate = require('../middlewares/tokenValidate');
const searchByQuery = require('../utils/searchByQuery');

const router = express.Router();

router.get('/search', tokenValidate, async (req, res) => {
  const search = req.query.q;

  const talkers = await searchByQuery(search);

  res.status(200).json(talkers);
});

router.get('/', async (_req, res) => {
  const talkers = await parsedData();

  if (!talkers) {
    return res.status(200).json([]);
  }

  res.status(200).json(talkers);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const talker = await getById(id);

  if (!talker) {
    return next({
      statusCode: 404,
      message: 'Pessoa palestrante não encontrada',
    });
  }

  res.status(200).json(talker);
});

router.post('/', validations, async (req, res) => {
  const { name, age, talk } = req.body;

  const newTalker = await createTalker({ name, age, talk });

  return res.status(201).json(newTalker);
});

router.put('/:id', validations, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editedTalker = await editTalker({ name, age, talk, id });

  res.status(200).json(editedTalker);
});

router.delete('/:id', tokenValidate, async (req, res) => {
  const { id } = req.params;

  await deleteTalker(id);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
