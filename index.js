const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('talker.json');
  if (!talkers.length) return res.status(HTTP_OK_STATUS).json([]);
  
  res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('talker.json');
  const [talker] = JSON.parse(talkers).filter(({ id: talkerID }) => talkerID === Number(id));
  if (!talker) {
  return res.status(HTTP_NOT_FOUND).json({
  message: 'Pessoa palestrante não encontrada',
}); 
}
  
  res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = validator.test(email);
  // const isPasswordGTE6 = password.length >= 6;
  if (!email) res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  if (!isValidEmail) {
  res.status(HTTP_BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    }); 
}
  if (!password) res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  if (/* !isPasswordGTE6 */ password.length < 6) {
  res.status(HTTP_BAD_REQUEST).json({
    message: 'O "password" deve ter pelo menos 6 caracteres',
  }); 
}
  const token = '16caracteresaqui';
  res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
