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

  const ROTA_TALKER = './talker.json';

// req 1
router.get('/', getTalkers);

// req 7
router.get('/search', validadeToken, async (req, res) => {
    const { q } = req.query;
  
    const talkers = await fs.readFile(ROTA_TALKER, 'utf-8').then((r) => JSON.parse(r));
  
    if (!q || q === '') return res.status(200).json(talkers);
  
    const filterQuery = talkers
      .filter(({ id, name, age, talk: { watchedAt, rate } }) => name.includes(q)
        || watchedAt.includes(q)
        || rate === Number(q)
        || age === Number(q)
        || id === Number(q));
  
    res.status(200).json(filterQuery);
  });

// req 2
router.get('/:id', searchIdTalk);

// req 2

router.put('/:id',
validadeToken,
validadeName,
validadeAge,
validadeTalk,
validadeDate,
validadeRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await fs.readFile(ROTA_TALKER, 'utf-8').then((r) => JSON.parse(r));
  const searchId = talkers.find((item) => item.id === Number(id));
  const newTalk = { id: searchId.id, name, age, talk };
  const modificTalk = talkers.map((item) => {
    if (item.id === Number(id)) {
      return newTalk;
    }
    return item;
  });
  await fs.writeFile(ROTA_TALKER, JSON.stringify(modificTalk));
  res.status(200).json(newTalk);
});

// req 5
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

// Requ 6
router.delete('/:id', validadeToken, async (req, res) => {
    const { id } = req.params;
  
    const talkers = await fs.readFile(ROTA_TALKER, 'utf-8').then((r) => JSON.parse(r));
    const filterId = talkers.filter((talk) => talk.id !== Number(id));
  
    await fs.writeFile(ROTA_TALKER, JSON.stringify(filterId));
  
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  }); 

module.exports = router;
