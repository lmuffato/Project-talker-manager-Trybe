const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const auth = require('./auth');

const getData = async () => fs.readFile('./talker.json', 'utf-8')
  .then((data) => JSON.parse(data));

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const result = await getData();
  res.status(200).json(result);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const allTalkers = await getData();
  const result = allTalkers.find((talker) => talker.id === +id);

  if (!result) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(result);
});

app.use('/login', auth);

app.listen(PORT, () => {
  console.log('Online');
});
