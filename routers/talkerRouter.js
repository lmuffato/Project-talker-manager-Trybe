const express = require('express');

const router = express.Router();

const readContentFile = require('../utils/readContentFile');

const writeContentFile = require('../utils/writeContentFile');

const writeContentFileEdition = require('../utils/writeContentFileEdition');

const writeContentFileDelete = require('../utils/writeContentFileDelete');

const { 
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NOT_FOUND_STATUS,
} = require('../utils/statusHTTP');

const { 
  isValidToken, 
  isValidName,
  isValidAge,
  isValidWatchedAt,
  isValidRate,
  isValidTalkKeys,
} = require('../middleWares/validations');

const PATH = './talker.json';

const VALIDATIONS_GET = [
  isValidToken,
];

router.get('/', async (_, res) => {
  const talkers = await readContentFile(PATH) || [];
  res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/search', VALIDATIONS_GET, async (req, res) => {
  const { searchTerm } = req.query;

  const talkers = await readContentFile(PATH) || [];

  if (!searchTerm || searchTerm === '') {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }

  const filteredTalker = talkers.filter((talker) => talker.name.includes(searchTerm));

  if (!filteredTalker) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(filteredTalker);
});

const VALIDATIONS_POST_AND_PUT_TALKER = [
  isValidToken, isValidName, isValidAge, isValidTalkKeys, isValidWatchedAt, isValidRate,
];

const VALIDATIONS_DELETE = [
  isValidToken,
];

router.post('/', VALIDATIONS_POST_AND_PUT_TALKER, async (req, res) => {
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
    await writeContentFile(PATH, newTalker);
  } catch (err) {
    console.log(err.message);
    return null;
  }
  res.status(HTTP_CREATED_STATUS).json(newTalker);
});

router.put('/:id', VALIDATIONS_POST_AND_PUT_TALKER, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const talkers = await readContentFile(PATH);
  const indexTalkerForEditing = talkers.findIndex((talker) => talker.id === +id);

  if (indexTalkerForEditing !== -1) {
    const newTalker = { id: +id, name, age, talk: { watchedAt, rate } };
    await writeContentFileEdition(PATH, newTalker, id);
    return res.status(HTTP_OK_STATUS).json(newTalker);
  }

  res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});

router.delete('/:id', VALIDATIONS_DELETE, async (req, res) => {
  const { id } = req.params;

  const talkers = await readContentFile(PATH);
  const talkersFiltered = talkers.filter((talker) => talker.id !== +id);

  if (!talkersFiltered) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  await writeContentFileDelete(PATH, talkersFiltered, id);
  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH);

  const talkerFilteredById = talkers.find((talker) => talker.id === +id);

  if (!talkerFilteredById) {
    return res
    .status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(HTTP_OK_STATUS).json(talkerFilteredById);
});

module.exports = router;
