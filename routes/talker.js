const { Router } = require('express');
const validateToken = require('../middleware/validateToken');
const validateName = require('../middleware/validateName');
const validateAge = require('../middleware/validateAge');
const { readTalker, writeTalker } = require('../model/talker');
const { 
  validateTalk,
  validateTalkEmptyValues,
  validateTalkKeys } = require('../middleware/validateTalk');

const talkerRouter = Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATED = 201;
const NOT_FOUND = 404;

talkerRouter.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const talker = await readTalker();
  const filteredTalker = talker.filter((t) => t.name.includes(q));
  return res.status(200).json(filteredTalker);
});

talkerRouter.get('/', async (_req, res) => {
  try {
    const talker = await readTalker();
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (e) {
    res.status(NOT_FOUND).json({ message: e.message });
  }
});

talkerRouter.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkEmptyValues,
  validateTalkKeys,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talker = await readTalker();
    const add = { id: talker.length + 1, name, age, talk };
    talker.push(add);
    writeTalker(talker);
    return res.status(HTTP_CREATED).json(add);
},
);

talkerRouter.put('/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateTalkEmptyValues,
validateTalkKeys,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talker = await readTalker();
  const talkerIndex = talker.findIndex((t) => t.id === +id);
  if (talkerIndex === -1) {
    return res.status(404);
  }
  talker[talkerIndex] = { id: +id, name, age, talk };
  await writeTalker(talker);
  return res.status(200).json(talker[talkerIndex]);
});

talkerRouter.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talker = await readTalker();
  const talkerIndex = talker.findIndex((t) => t.id === +id);
  if (talkerIndex === -1) {
    return res.status(404);
  }
  talker.splice(talkerIndex, 1);
  writeTalker(talker);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
    const talker = await readTalker();
    // https://www.w3schools.com/jsref/jsref_parseint.asp considerando decimal
    const talkerById = talker.find((t) => t.id === +id);
    if (talkerById === undefined) { 
      return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
    res.status(HTTP_OK_STATUS).json(talkerById);
});

module.exports = talkerRouter;