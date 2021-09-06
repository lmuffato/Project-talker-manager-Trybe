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

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await loadTalkers();

  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 8));
  talkers.splice(talkerIndex, 1);

  await fs.writeFile(FILEPATH, JSON.stringify(talkers), (error) => { if (error) throw error; });

  return res.status(200).json({
    message: 'Pessoa palestrante deletada com sucesso',
  });
});

module.exports = router;