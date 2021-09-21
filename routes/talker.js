const fs = require('fs').promises;
const { Router } = require('express');

const manageTalkersFile = require('../utils/manageTalkers');
const { OK, CREATE } = require('../utils/status');
const getTalkerById = require('../utils/talkerById');
const validateAge = require('../utils/validateAge');
const validateName = require('../utils/validateName');
const validateRate = require('../utils/validateRate');
const validateTalk = require('../utils/validateTalk');
const validateToken = require('../utils/validateToken');
const validateWatched = require('../utils/validateWatchedAt');

const router = Router();

router.get('/', async (_req, res) => {
  const talkers = await manageTalkersFile();
  res.status(OK).json(talkers);
});

router.get('/:id', getTalkerById);

router.post('/',
validateToken,
validateAge,
validateTalk,
validateName,
validateRate,
validateWatched, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await manageTalkersFile();
  const newTalker = {
    id: (talkers.length + 1),
    name,
    age: parseInt(age, 10),
    talk: {
      watchedAt,
      rate: parseInt(rate, 10),
  } };
  talkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  res.status(CREATE).json(newTalker);
});

router.put('/:id', 
validateToken,
validateAge,
validateTalk,
validateName,
validateRate,
validateWatched, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await manageTalkersFile();
  const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  if (talkers[talkerIndex] !== -1) {
    talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk: { watchedAt, rate } };
    const filterOutdatedInfo = talkers.filter((talker) => talker.id !== parseInt(id, 10));
    filterOutdatedInfo.push(talkers[talkerIndex]);
    await fs.writeFile('./talker.json', JSON.stringify(filterOutdatedInfo), 'utf-8');
    res.status(OK).json(talkers[talkerIndex]);
  }
});

module.exports = router;