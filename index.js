const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const {  
  gerarToken,
  validarPassword,
  validarEmail,
  validarToken,
  validarNome,
  validarIdade,
  validarTalk,
  validarTalkRate } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKER = '/talker';
const TALKER_ID = '/talker/:id';
const LOGIN = '/login';

const PALESTRANTE_NAO_ENCONTRADO = 'Pessoa palestrante não encontrada';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get(TALKER, async (_req, res) => {
  try {
    const request = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
    res.status(200).json(request);
  } catch (e) {
    res.status(200).json([]);
  }
});

app.get(TALKER_ID, async (req, res) => {
  const request = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
  const talker = request.find((t) => t.id === Number(req.params.id));
  if (!talker) return res.status(404).json({ message: PALESTRANTE_NAO_ENCONTRADO });
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.post(LOGIN, validarEmail, validarPassword, (_req, res) => res.status(HTTP_OK_STATUS)
  .json({ token: gerarToken() }));

  app.post(TALKER, validarToken,
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
