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

app.get('/talker', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const fetchData = await JSON.parse(data);

  res.status(HTTP_OK_STATUS).json(fetchData);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile('./talker.json', 'utf-8');
  const fetchData = await JSON.parse(data);

  const talkerId = fetchData.find((r) => r.id === +id);
  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada'});

  res.status(HTTP_OK_STATUS).json(talkerId);
});

app.listen(PORT, () => {
  console.log('Online');
});
