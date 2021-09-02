const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { writeFileSync } = require('fs');
const { validateEmailMiddleware, 
  validatePasswordMiddleware } = require('./services/middlewares/loginMiddlewares');
const { validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate } = require('./services/middlewares/talkerMiddlewares');
const { readFileCustom } = require('./services/handleFileSystem/readFileCustom');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// INCÍCIO MINHAS IMPLEMENTAÇÕES

// req 1
app.get('/talker', async (_req, res) => {
  const talker = await readFileCustom();
  if (!talker) return res.status(HTTP_OK_STATUS).send([]);
  res.status(HTTP_OK_STATUS).send(talker);
});
// req 7
app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkerArr = await readFileCustom();
  const arrMatch = talkerArr.filter((t) => t.name.includes(q)); // filtro
  if (!q || q === '') {
    return res.status(200).send(talkerArr);
  }
  return res.status(200).send(arrMatch);
});
// req 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerArr = await readFileCustom();
  const talkerIndex = talkerArr.findIndex((t) => t.id === +id);
  if (talkerIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  }
  res.status(HTTP_OK_STATUS).json(talkerArr[talkerIndex]);
});
// req 3
app.post('/login', validateEmailMiddleware, validatePasswordMiddleware, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).send({ token });
});
// req 4
app.post('/talker', validateToken, validateName,
validateAge, validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readFileCustom();
  const newTalker = {
    id: talkers.length + 1, name, age, talk,
  };
  talkers.push(newTalker);
  writeFileSync('./talker.json', JSON.stringify(talkers));
  return res.status(201).json(newTalker);
});

// req 5
app.put('/talker/:id', validateToken, validateName,
validateAge, validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkerArr = await readFileCustom();
  const talkerIndex = talkerArr.findIndex((t) => t.id === +id);
  if (talkerIndex === -1) {
    return res.status(400).send({ message: 'Talker não existe' });
  }
  talkerArr[talkerIndex].name = name;
  talkerArr[talkerIndex].age = age;
  talkerArr[talkerIndex].talk = talk;
  writeFileSync('./talker.json', JSON.stringify(talkerArr));
  res.status(200).send(talkerArr[talkerIndex]);
});
// req 6
app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkerArr = await readFileCustom();
  const talkerIndex = talkerArr.findIndex((t) => t.id === +id);
  if (talkerIndex === -1) {
    return res.status(401).send({ message: 'Palestrante não encontrado' });
  }
  talkerArr.splice(talkerIndex, 1);
  writeFileSync('./talker.json', JSON.stringify(talkerArr));
  return res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
});

// FINAL MINHAS IMPLEMENTAÇÕES

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
