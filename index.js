const express = require('express');
const bodyParser = require('body-parser');
const { conn } = require('./model/conn');

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

app.get('/talker', async (_req, res) => {
  const doc = await conn();
  const file = doc.length !== 0 ? JSON.parse(doc) : [];
  res.status(HTTP_OK_STATUS).json(file);
});