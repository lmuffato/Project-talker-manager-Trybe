const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// const crypto = require('crypto');

// crypto.randomBytes(16).toString('hex');

// const { validateToken, validateEmail, validatePassword } = require('./validation.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// requisito 1
app.get('/talker', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);
  // o readFile não sabe qual tipo de arquivo está lendo então preciso transformar esse dado em json

  res.status(HTTP_OK_STATUS).json(talker);
});

// requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params.id;
  
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);

  const talkerId = talker.find((item) => item.id === Number(id));
  console.log(talkerId);

  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(talkerId);
});

// requisito 3
// app.post('/login', validateEmail, validatePassword, (req, res) => {
  
// });

// // requisito 4
// app.post('/login', validateToken, validateEmail, validatePassword, (req, res) => {
  
// });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
