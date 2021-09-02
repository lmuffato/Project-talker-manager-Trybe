const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();
const {
  validadeToken,
  validadeName,
  validadeAge,
  validadeTalk,
  validadeRate,
  validadeDate,
} = require('../middlewares');

const ERROR_404 = 'Pessoa palestrante não encontrada';
const ROTA_TALKER = './talker.json';

// Requisito 1
router.get('/', async (_req, res) => {
  try {
    const request = await fs.readFile(ROTA_TALKER, 'utf-8').then((r) => JSON.parse(r));
    res.status(200).json(request);
  } catch (_err) {
    res.status(200).json([]);
  }
});

// Requisito 7
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

// Requisito 2
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const request = await fs.readFile(ROTA_TALKER, 'utf-8').then((r) => JSON.parse(r));
  const findTalker = request.find((e) => e.id === Number(id));

  if (!findTalker) return res.status(404).json({ message: ERROR_404 });

  res.status(200).json(findTalker);
});

// Requisito 5
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

// Requisito 4
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

// Requisito 6
router.delete('/:id', validadeToken, async (req, res) => {
  const { id } = req.params;

  const talkers = await fs.readFile(ROTA_TALKER, 'utf-8').then((r) => JSON.parse(r));
  const filterId = talkers.filter((talk) => talk.id !== Number(id));

  await fs.writeFile(ROTA_TALKER, JSON.stringify(filterId));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;