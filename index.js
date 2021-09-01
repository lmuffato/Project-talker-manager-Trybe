const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');
const {
  validateEmailMiddleware,
  validatePasswordMiddleware,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
  validateTalkEmptyValues,
} = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED = 201;
const NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readTalker = async () => {
  const talker = await fs.readFile('talker.json');
  return JSON.parse(talker);
};

const writeTalker = async (data) => {
  await fs.writeFile('talker.json', JSON.stringify(data));
};

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const talker = await readTalker();
  const filteredTalker = talker.filter((t) => t.name.includes(q));
  return res.status(200).json(filteredTalker);
});

app.get('/talker', async (_req, res) => {
  try {
    const talker = await readTalker();
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (e) {
    res.status(NOT_FOUND).json({ message: e.message });
  }
});

app.post(
  '/talker',
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

app.put('/talker/:id',
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
  writeTalker(talker);
  return res.status(200).json(talker[talkerIndex]);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
    const talker = await readTalker();
    // https://www.w3schools.com/jsref/jsref_parseint.asp considerando decimal
    const talkerById = talker.find((t) => t.id === +id);
    if (talkerById === undefined) { 
      return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
    res.status(HTTP_OK_STATUS).json(talkerById);
});

app.post('/login', validateEmailMiddleware, validatePasswordMiddleware, (req, res) => {
  // https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
  const token = crypto.randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).json({ token });
});
