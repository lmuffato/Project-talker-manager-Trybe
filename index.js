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
} = require('./utils/middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const ERROR_404 = 'Pessoa palestrante não encontrada';

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
    const request = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
    res.status(200).json(request);
  } catch (_err) {
    res.status(200).json([]);
  }
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const request = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
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
app.post('/talker', validadeToken, validadeName, validadeAge, validadeTalk, async (req, res) => {
  const { id, name, age, talk } = req.body;

  const talkers = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
  console.log(talkers);

  talkers.push({ id, name, age, talk });
  fs.writeFile('./talker.json', JSON.stringify(talkers));

  res.status(201).json({ id, name, age, talk });
});