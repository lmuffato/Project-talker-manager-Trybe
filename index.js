const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { randToken } = require('./utils/funtions');
const {
  validadeEmail,
  validadePassword,
  validadeToken,
  validadeName,
  validadeAge,
  validadeTalk,
  validadeRate,
} = require('./utils/middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const ERROR_404 = 'Pessoa palestrante não encontrada';
const ROTA_TALKER = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 1
app.get('/talker', async (_req, res) => {
  try {
    const request = await fs.readFile(ROTA_TALKER, 'utf-8').then((r) => JSON.parse(r));
    res.status(200).json(request);
  } catch (_err) {
    res.status(200).json([]);
  }
});

// Requisito 5
app.put('.talker/:id', validadeToken, validadeName, validadeAge, validadeTalk, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await fs.readFile(ROTA_TALKER, 'utf-8').then((r) => JSON.parse(r));
  const modificTalk = talkers.map((item) => {
    if (item.id === Number(id)) {
      return {
        name,
        age,
        id: item.id,
        talk,
      };
    }
    return item;
  });
  await fs.writeFile(ROTA_TALKER, JSON.stringify(modificTalk));
  res.status(200).end();
});

// Requisito 7
app.get('/talker/search', validadeToken, async (req, res) => {
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
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const request = await fs.readFile(ROTA_TALKER, 'utf-8').then((r) => JSON.parse(r));
  const findTalker = request.find((e) => e.id === Number(id));

  if (!findTalker) return res.status(404).json({ message: ERROR_404 });

  res.status(200).json(findTalker);
});

// Requisito 3
app.post('/login', validadeEmail, validadePassword, (_req, res) => {
  const token = randToken(16);

  res.status(200).json({ token });
});

// Requisito 4
app.post('/talker',
validadeToken,
validadeName,
validadeAge,
validadeTalk,
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
app.delete('/talker/:id', validadeToken, async (req, res) => {
  const { id } = req.params;

  const talkers = await fs.readFile(ROTA_TALKER, 'utf-8').then((r) => JSON.parse(r));
  const filterId = talkers.filter((talk) => talk.id !== Number(id));

  await fs.writeFile(ROTA_TALKER, JSON.stringify(filterId));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
