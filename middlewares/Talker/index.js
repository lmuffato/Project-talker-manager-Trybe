const express = require('express');
const router = express.Router();
const { fileReader, fileWriter } = require('../../utils/talkersFileOperations');

const {
  validateAge,
  validateName,
  validateTalk,
  validateToken,
  validateDateFormat,
  validateRate,
} = require('../validators');

const talkerValidators = [
  validateAge,
  validateName,
  validateTalk,
  validateDateFormat,
  validateRate,
];

router.get('/', async (_req, res) => {
  const parsedTalker = await fileReader();
  return res.status(HTTP_OK_STATUS).json(parsedTalker || []);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const parsedTalkers = await fileReader();
  const queriedTalker = parsedTalkers.filter((t) => t.name.includes(q));

  return res.status(200).json(queriedTalker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const parsedTalkers = await fileReader();

  const talker = parsedTalkers.find((t) => t.id === +id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

router.post('/', validateToken, talkerValidators, async (req, res) => {
  const { name, age, talk } = req.body;
  
  const parsedTalkers = await fileReader();

  const talker = {
    id: parsedTalkers.length + 1,
    name,
    age,
    talk,
  };

  const newTalkers = [...parsedTalkers, talker];
  
  await fileWriter(newTalkers);

  return res.status(201).json(talker);
});

router.put('/:id', validateToken, talkerValidators, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const parsedTalkers = await fileReader();
  const filteredTalkersObj = parsedTalkers.filter((t) => t.id !== +id);
  
  const editedTalker = {
    id: +id,
    name,
    age,
    talk,
  };
  const newTalkers = [...filteredTalkersObj, editedTalker];
  await fileWriter(newTalkers);
  return res.status(200).json(editedTalker);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const parsedTalkers = await fileReader();
  const filteredTalkersObj = parsedTalkers.filter((t) => t.id !== +id);

  await fileWriter(filteredTalkersObj);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;