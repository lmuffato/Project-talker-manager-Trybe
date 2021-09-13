const express = require('express');
const bodyParser = require('body-parser');
const readFileAsync = require('./modules');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const FILE_NAME = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await readFileAsync(FILE_NAME);
  if (!data) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).send(JSON.parse(data));
});

app.get('/talker/:id', async (req, res) => {
  const data = await readFileAsync(FILE_NAME);
  const talkersId = await Number(req.params.id);
  const getTalker = await JSON.parse(data).find((talker) => talker.id === talkersId);

  if (!getTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).send(getTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
