const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readTalkers = async () => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(file);
};

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalkers();
  const { id } = req.params;
  const myTalker = talkers.find((t) => t.id === parseInt(id));
  if (!myTalker) return res.status(404).json({ "message": "Pessoa palestrante não encontrada" });
  res.status(HTTP_OK_STATUS).json(myTalker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email === '') return res.status(400).json({ "message": "O campo \"email\" é obrigatório" });
  if (!reg.test(email)) return res.status(400).json({ "message": "O \"email\" deve ter o formato \"email@email.com\"" });
  if (!password || password === '') return res.status(400).json({ "message": "O campo \"password\" é obrigatório" });
  if (password.length < 6) res.status(400).json({"message": "O \"password\" deve ter pelo menos 6 caracteres"});

  res.status(HTTP_OK_STATUS).json({ "token": "7mqaVRXJSp886CGr" });
});
