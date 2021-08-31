const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, eh para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talkers);
  response.status(200).json(result);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talkers);
  const talkerId = result.find((talker) => talker.id === +id);
  if (!talkerId) response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  response.status(200).json(talkerId);
});

app.listen(PORT, () => {
  console.log('Online');
});
