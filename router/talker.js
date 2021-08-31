const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const { readFile } = require('../fs-util');
const {
  validateName,
  validateAge,
  validateTalkDate,
  validateTalkRate,
  validateTalk,
} = require('../middlewares/validateTalker');
const addTalker = require('../middlewares/addTalker');

const router = Router();// { mergeParams: true }

const HTTP_OK_STATUS = 200;

const allValidates = [
  validateName,
  validateAge,
  validateTalk,
  validateTalkDate,
  validateTalkRate,
];

router.get('/', async (_req, res) => {
  const arrTalkers = await readFile();
  res.status(HTTP_OK_STATUS).json(arrTalkers);
});

router.post('/', validateToken, allValidates, addTalker);

router.get('/:id', async (req, res) => {
  const arrTalkers = await readFile();
  const talker = arrTalkers.find((t) => t.id === Number(req.params.id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(talker);
});

module.exports = router;