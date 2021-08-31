const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');

  return res.status(200).json(JSON.parse(talkers));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(talkers)
    .filter((tal) => tal.id === Number(id));

  if (talker.length < 1) {
    return res.status(404).json({
     message: 'Pessoa palestrante não encontrada',
   });
  }

  res.status(200).json(talker[0]);
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
