const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();
const {
  validarToken,
  validarNome,
  validarIdade,
  validarTalk,
  validarRate,
  validarData,
} = require('../middlewares');

const PALESTRANTE_NAO_ENCONTRADO = 'Pessoa palestrante não encontrada';
const talkerJSON = './talker.json';
const HTTP_OK_STATUS = 200;

router.get('/', async (_req, res) => {
  try {
    const request = await fs.readFile(talkerJSON, 'utf-8').then((r) => JSON.parse(r));
    res.status(HTTP_OK_STATUS).json(request);
  } catch (_err) {
    res.status(HTTP_OK_STATUS).json([]);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const request = await fs.readFile(talkerJSON, 'utf-8').then((r) => JSON.parse(r));
  const findTalkerPorId = request.find((e) => e.id === Number(id));
  if (!findTalkerPorId) return res.status(404).json({ message: PALESTRANTE_NAO_ENCONTRADO });
  res.status(HTTP_OK_STATUS).json(findTalkerPorId);
});

router.post('/',
validarToken,
validarNome,
validarIdade,
validarTalk,
validarData,
validarRate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await fs.readFile(talkerJSON, 'utf-8').then((r) => JSON.parse(r));
  const talker = { id: talkers.length + 1, name, age, talk };
  talkers.push(talker);
  await fs.writeFile(talkerJSON, JSON.stringify(talkers));
  res.status(201).json(talker);
});

router.put('/:id',
validarToken,
validarNome,
validarIdade,
validarTalk,
validarData,
validarRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await fs.readFile(talkerJSON, 'utf-8').then((r) => JSON.parse(r));
  const findTalkerPorId = talkers.find((item) => item.id === Number(id));
  const putTalk = { id: findTalkerPorId.id, name, age, talk };
  const alterarTalk = talkers.map((item) => {
    if (item.id === Number(id)) {
      return putTalk;
    }
    return item;
  });
  await fs.writeFile(talkerJSON, JSON.stringify(alterarTalk));
  res.status(HTTP_OK_STATUS).json(putTalk);
});

module.exports = router;