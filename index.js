const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const login = require('./middlewares/login');

const talkers = async () => fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const arrTalkers = await talkers();
  res.status(HTTP_OK_STATUS).json(arrTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const arrTalkers = await talkers();
  const talker = arrTalkers.find((t) => t.id === Number(req.params.id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
