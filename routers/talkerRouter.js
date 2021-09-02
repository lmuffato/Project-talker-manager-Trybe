const express = require('express');

const router = express.Router();

const readContentFile = require('../utils/readContentFile');

const writeContentFile = require('../utils/writeContentFile');

const { 
  isValidToken, 
  isValidName,
  isValidAge,
  isValidWatchedAt,
  isValidRate,
  isValidTalkKeys,
} = require('../middleWares/validations');

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;

const PATH = './talker.json';

router.get('/', async (_, res) => {
  const talkers = await readContentFile(PATH) || [];
  res.status(HTTP_OK).json(talkers);
});

const VALIDATIONS = [
  isValidToken, isValidName, isValidAge, isValidTalkKeys, isValidWatchedAt, isValidRate,
];

router.post('/', VALIDATIONS, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  let newTalker;

  try {
    const talkers = await readContentFile(PATH);
    const id = talkers[talkers.length - 1].id + 1;
    newTalker = { id, name, age, talk: { watchedAt, rate } };
  } catch (err) {
    console.log(err.message);
    return null;
  }
  try {
    await writeContentFile('./talker.json', newTalker);
  } catch (err) {
    console.log(err.message);
    return null;
  }
  res.status(HTTP_CREATED).json(newTalker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH);

  const talkerFilteredById = talkers.find((talker) => talker.id === +id);

  if (!talkerFilteredById) {
    return res
    .status(HTTP_NOT_FOUND)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(HTTP_OK).json(talkerFilteredById);
});

module.exports = router;
