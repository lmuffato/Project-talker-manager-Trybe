const express = require('express');
const fs = require('fs').promises;
const { verifyAge,
  verifyName,
  verifyTalkRate,
  verifyTalkWatchedAt,
  verifyToken } = require('../middlewares/talker');

const loadTalkers = require('../utils/loadTalkers');

const FILEPATH = './talker.json';

const router = express.Router();

router.post('/', verifyToken, 
verifyAge,
verifyName,
verifyTalkRate,
verifyTalkWatchedAt,
 async (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = await loadTalkers();

  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };

  talkers.push(newTalker);
  await fs.writeFile(FILEPATH, JSON.stringify(talkers), (error) => { if (error) throw error; });

  return res.status(201).json(newTalker);
});

module.exports = router;