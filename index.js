const express = require('express');
const bodyParser = require('body-parser');
const { conn } = require('./model/conn');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
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
  res.status(HTTP_OK_STATUS).json(doc);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const doc = await conn();
  const talker = doc.find((item) => item.id === Number(id));

  if (talker) {
    res.status(HTTP_OK_STATUS).json(talker);
  }

  res.status(HTTP_NOTFOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});