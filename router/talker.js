const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();
const {
  validarToken,
  validarNome,
  validarIdade,
  validarTalk,
  validarTalkRate,
} = require('../middlewares');

const HTTP_OK_STATUS = 200;

const PALESTRANTE_NAO_ENCONTRADO = 'Pessoa palestrante não encontrada';

router.get('/', async (_req, res) => {
  try {
    const request = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
    res.status(200).json(request);
  } catch (e) {
    res.status(200).json([]);
  }
});

router.get('/:id', async (req, res) => {
  const request = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
  const talker = request.find((t) => t.id === Number(req.params.id));
  if (!talker) return res.status(404).json({ message: PALESTRANTE_NAO_ENCONTRADO });
  return res.status(HTTP_OK_STATUS).json(talker);
});

router.post('/', validarToken,
  validarNome,
  validarIdade,
  validarTalk,
  validarTalkRate, async (req, res) => {
    const { id, name, age, talk } = req.body;
  
    const talkers = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
    console.log(talkers);
  
    talkers.push({ id, name, age, talk });
    fs.writeFile('./talker.json', JSON.stringify(talkers));
  
    res.status(201).json({ id, name, age, talk });
  });

module.exports = router; 