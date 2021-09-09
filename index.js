const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const { conn, registerTalker } = require('./model');
const { createTalkerService, tokenValidation } = require('./services');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const HTTP_NOTFOUND = 400;
const HTTP_OK_CREATE = 201;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const doc = await conn();
  return res.status(HTTP_OK_STATUS).json(doc);
});

app.get('/talker/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const data = await conn();
  if (!q) return res.status(HTTP_OK_STATUS).json(data);
  const talker = data.filter((talkerPeaple) => talkerPeaple.name.includes(q));
  if (!talker) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const doc = await conn();
  const talker = doc.find((item) => item.id === Number(id));

  if (talker) {
    return res.status(HTTP_OK_STATUS).json(talker);
  }

  return res.status(HTTP_NOTFOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', (req, res) => {
  const regex = /\S+@\S+\.\S+/;
  const { email, password } = req.body;
  const emailTest = regex.test(email);
  if (!email) {
    return res.status(HTTP_NOTFOUND).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailTest) {
    return res.status(HTTP_NOTFOUND)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(HTTP_NOTFOUND).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(HTTP_NOTFOUND)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

app.post('/talker', tokenValidation, async (req, res) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(HTTP_NOTFOUND)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
    const validTalker = createTalkerService(req.body);
  const { message } = validTalker;
  if (message) return res.status(HTTP_NOTFOUND).json(validTalker);

  const createNewTalker = await registerTalker(req.body);
  return res.status(HTTP_OK_CREATE).json(createNewTalker);
});

app.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const data = await conn();
  const doc = data.filter((talker) => talker.id !== +id);
  await fs.writeFile('./talker.json', JSON.stringify(doc));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.put('/talker/:id', tokenValidation, async (req, res) => {
  const { talk } = req.body;
  const { id } = req.params;
  const data = await conn();
  const doc = data.filter((talker) => talker.id !== +id);
  await fs.writeFile('./talker.json', JSON.stringify(doc));
  if (!talk) {
    return res.status(HTTP_NOTFOUND)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  const validTalker = createTalkerService(req.body);
  const { message } = validTalker;
  if (message) return res.status(HTTP_NOTFOUND).json(validTalker);

  const createNewTalker = await registerTalker(req.body);
  return res.status(HTTP_OK_STATUS).json(createNewTalker);
});
