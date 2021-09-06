const express = require('express');
const fs = require('fs').promises;
const { verifyAge,
  verifyName,
  verifyTalkRate,
  verifyTalkWatchedAt,
  verifyToken } = require('../middlewares/talker');

const loadTalkers = require('../utils/loadTalkers');
const editTalker = require('../utils/editTalker');

const FILEPATH = './talker.json';

const router = express.Router();

const validators = [verifyToken, 
  verifyAge,
  verifyName,
  verifyTalkRate,
  verifyTalkWatchedAt];

router.post('/', validators,
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

router.put('/:id', validators, editTalker);

module.exports = router;