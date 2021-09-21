const { Router } = require('express');

const manageTalkersFile = require('../utils/manageTalkers');
const { OK } = require('../utils/status');
const getTalkerById = require('../utils/talkerById');

const router = Router();

router.get('/', async (_req, res) => {
  const talkers = await manageTalkersFile();
  res.status(OK).json(talkers);
});

router.get('/:id', getTalkerById);

module.exports = router;