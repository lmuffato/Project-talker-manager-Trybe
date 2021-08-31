const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkers = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const readFile = () => fs.readFile(talkers, 'utf8')
  .then((data) => JSON.parse(data));

app.get('/talker', async (_req, res) => {
  const talkersList = await readFile();
  return res.status(HTTP_OK_STATUS).json(talkersList);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile();
  const foundTalker = talkersList.find((talker) => talker.id === parseInt(id, 0));

  if (!foundTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).send(foundTalker);
});
