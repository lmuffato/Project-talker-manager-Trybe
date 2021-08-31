const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const generateToken = require('./utils/helpers');
const { isValidEmail, isValidPassword } = require('./middlewares/validations');

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
  const talker = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talker);
  res.status(200).json(result);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talker);
  const speaker = result.find((obj) => obj.id === parseInt(id, 0));
  if (!speaker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(speaker);
});

app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  res.status(200).json({ token: generateToken(16) });
});
