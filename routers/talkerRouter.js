const router = require('express').Router();
const fs = require('fs').promises;
const { 
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
} = require('../middlewares/validations');
const { readTalker } = require('../utils/helpers');

router.get('/', async (_req, res) => {
  const talker = await readTalker();
  res.status(200).json(talker);
});

router.post(
  '/',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talker = await readTalker();
    const id = talker.length + 1;
    const { watchedAt, rate } = talk;
    const obj = {
      name, 
      age,
      id,
      talk: { watchedAt, rate },
    };
    talker.push(obj);
    await fs.writeFile('talker.json', JSON.stringify(talker));
    res.status(201).json(obj);
  },
);

router.get('/search', isValidToken, async (req, res) => {
  const { q } = req.query;
  const talker = await readTalker();
  if (!q || q === '') {
    return res.status(200).json(talker);
  }
  const filteredTalkers = talker.filter((obj) => obj.name.includes(q));
  res.status(200).json(filteredTalkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readTalker();
  const speaker = talker.find((obj) => obj.id === parseInt(id, 0));
  if (!speaker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(speaker);
});

router.put(
  '/:id',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
  async (req, res) => {
    const { id } = req.params;
    const talker = await readTalker();
    const speaker = talker.find((obj) => obj.id === parseInt(id, 0));
    const filteredSpeakers = talker.filter((obj) => obj.id !== id);
    const editedSpeaker = { ...speaker, ...req.body };
    filteredSpeakers.push(editedSpeaker);
    await fs.writeFile('talker.json', JSON.stringify(filteredSpeakers));
    res.status(200).json(editedSpeaker);
  },
);

router.delete('/:id', isValidToken, async (req, res) => {
  const { id } = req.params;
  const talker = await readTalker();
  const newObj = talker.filter((obj) => obj.id !== parseInt(id, 10));
  await fs.writeFile('talker.json', JSON.stringify(newObj));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
