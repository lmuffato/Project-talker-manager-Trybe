const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// INCÍCIO MINHAS IMPLEMENTAÇÕES
// função que lê o json, retorna null se o array for de tamanho 0.
const readFileCustom = async () => {
  let file = await fs.readFile('talker.json');
  file = JSON.parse(file);
  if (file.length === 0) return null;
  return file;
  // console.log(file.length);
};
// req 1
app.get('/talker', async (_req, res) => {
  const talker = await readFileCustom();
  if (!talker) return res.status(HTTP_OK_STATUS).send([]);
  res.status(HTTP_OK_STATUS).send(talker);
});
// req 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerArr = await readFileCustom();
  const talkerIndex = talkerArr.findIndex((t) => t.id === +id);
  if (talkerIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  }
  res.status(HTTP_OK_STATUS).json(talkerArr[talkerIndex]);
});
// req 3
const validateEmail = (email) => {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  return (emailPattern.test(email));
};

const validateEmailMiddleware = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') { // tratando email vazio ou inexistente
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) { // tratando e-mail inválido
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePasswordMiddleware = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

app.post('/login', validateEmailMiddleware, validatePasswordMiddleware, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).send({ token });
});
// FINAL MINHAS IMPLEMENTAÇÕES

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
