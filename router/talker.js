const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();
const {
  validarToken,
  validarNome,
  validarIdade,
  validarTalk,
  validarTalkData,
  validarRate,
  tokenInvalido,
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

router.post('/', 
  validarToken,
  validarNome,
  validarIdade,
  validarTalk,
  validarRate,
  tokenInvalido,
  validarTalkData, async (req, res) => {
    const { name, age, talk, Authorization } = req.body;

    const talkers = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
    const talker = { id: talkers.length + 1, name, age, talk, Authorization };
  
    talkers.push(talker);
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
  
    res.status(201).json(talker);
  });

module.exports = router; 