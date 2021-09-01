const { Router } = require('express');
const fs = require('fs').promises;
const {
  isValidName,
  isValidToken,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
} = require('../Validations/validations');

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile('talker.json', 'utf-8');
    const talkers = JSON.parse(data);
    res.status(200).json(talkers);
  } catch (e) {
    console.error(`Erro: ${e}`);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile('talker.json', 'utf-8');
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === parseInt(id, 0));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

router.post('/',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidDate,
  isValidRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const data = await fs.readFile('talker.json', 'utf-8');
    const talkers = JSON.parse(data);
    const id = talkers.length + 1;
    const newTalker = {
      id,
      name,
      age,
      talk: { watchedAt: talk.watchedAt, rate: talk.rate },
    };
    talkers.push(newTalker);
    fs.writeFile('talker.json', JSON.stringify(talkers));
    const talkUser = talkers.find((t) => t.id === talkers.length);
    if (talkUser) {
      res.status(201).json(talkUser);
    }
  });

module.exports = router;