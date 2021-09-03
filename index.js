const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const { validateToken, validateEmail, validatePassword } = require('./validation.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);

  const talkerId = talker.find((item) => item.id === Number(id));
  // console.log(talkerId);

  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(talkerId);
});

// requisito 1
app.get('/talker', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data); // o readFile não sabe qual tipo de arquivo está lendo então preciso transformar esse dado em json

  res.status(HTTP_OK_STATUS).json(talker);
});

// requisito 3
app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = crypto.randomBytes(16).toString('hex'); // crio um numero aleatorio de 16 caracteres, tive ajuda do Pedro Ramos durante o plantão
  console.log(token);

  res.status(HTTP_OK_STATUS).json(token);
});

// // requisito 4
app.post('/taker', validateToken, validateEmail, validatePassword, (_req, res) => {
  
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
