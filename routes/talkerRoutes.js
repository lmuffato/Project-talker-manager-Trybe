const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const getTalkers = require('../Middlewares/getTalkers');
const searchIdTalk = require('../Middlewares/searcheIdTalk');
const {
    validadeToken,
    validadeName,
    validadeAge,
    validadeTalk,
    validadeRate,
    validadeDate,
  } = require('../Middlewares/validateMiddlewares');

router.get('/', getTalkers);
router.get('/:id', searchIdTalk);

const ROTA_TALKER = './talker.json';

router.post('/',
validadeToken,
validadeName,
validadeAge,
validadeTalk,
validadeDate,
validadeRate,
async (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = await fs.readFile(ROTA_TALKER, 'utf-8').then((r) => JSON.parse(r));
  const talker = { id: talkers.length + 1, name, age, talk };

  talkers.push(talker);
  await fs.writeFile(ROTA_TALKER, JSON.stringify(talkers));

  res.status(201).json(talker);
});

module.exports = router;
