const express = require('express');
const fs = require('fs').promises;
const { verifyAge,
  verifyName,
  verifyTalkRate,
  verifyTalkWatchedAt,
  verifyToken } = require('../middlewares/talker');

const loadTalkers = require('../utils/loadTalkers');

const router = express.Router();

router.post('/', verifyAge,
verifyName,
verifyTalkRate,
verifyTalkWatchedAt,
verifyToken, async (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = await loadTalkers();

  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };

  const addNewTalker = talkers.push(newTalker);
  await fs.writeFile('../talker.json', JSON.stringify(addNewTalker));

  return res.status(201).json(newTalker);
});

module.exports = router;