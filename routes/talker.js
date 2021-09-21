const fs = require('fs');
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
validateAge,
validateTalk,
validateName,
validateToken,
validateRate,
validateWatched, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await fs.readFile('./talker.json');
  const talker = JSON.parse(talkers);
  const newTalker = {
  id: (talker.length + 1),
  name,
  age: parseInt(age, 10),
  talk: {
    watchedAt,
    rate: parseInt(rate, 10),
  } };
  talker.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talker));
  res.status(CREATE).json(newTalker);
});

module.exports = router;