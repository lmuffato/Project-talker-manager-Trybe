const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const rescue = require('express-rescue');

const checkAuth = require('./checkAuth');
const getTalkers = require('./getTalkers');
const {
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
} = require('./validateTalker');

const addTalker = async (talkers) => {
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
};

const HTTP_OK_STATUS = 200;

router.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const talker = await getTalkers().then((talkers) =>
      talkers.find((t) => t.id === Number(id)));
    if (!talker) {
      // throw new Error();
      res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
      return;
    }
    res.status(HTTP_OK_STATUS).json(talker);
  }),
);

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

router.post(
  '/',
  checkAuth,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await getTalkers();
    const lastTalk = talkers[talkers.length - 1];
    const newTalk = { name, age, talk, id: lastTalk.id + 1 };
    const newTalkers = [...talkers, newTalk];
    await addTalker(newTalkers);
    res.status(201).json(newTalk);
  },
);

module.exports = router;
