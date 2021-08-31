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

app.get('/talker', async (req, res, next) => {
  try {
    const content = await fs.readFile('./talker.json');
    const talkers = JSON.parse(content);
    res.status(200).json(talkers);
  } catch (e) {
    console.log('Tratamento no middleware específico');
    next(e.message);
  }
});

app.get('/talker/:id', async (req, res) => {
  const content = await fs.readFile('./talker.json');
  const talkers = JSON.parse(content);
  const { id } = req.params;
  const talker = talkers.find((t) => t.id === parseInt(id.substring(id.length - 1), 10));
  // https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

app.use((err, _req, res, _next) => {
  console.log('Passou pelo middleware');
  res.status(400).json({ message: err });
});

app.listen(PORT, () => {
  console.log('Online');
});
