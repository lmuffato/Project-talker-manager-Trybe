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

module.exports = router;