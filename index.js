const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');
const { writeFileSync } = require('fs');

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
// req 4
const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};
const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};
const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};
const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório e "watchedAt"'
      + ' e "rate" não podem ser vazios' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const re = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!re.test(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

app.post('/talker', validateToken, validateName,
validateAge, validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readFileCustom();
  const newTalker = {
    id: talkers.length + 1, name, age, talk,
  };
  talkers.push(newTalker);
  writeFileSync('./talker.json', JSON.stringify(talkers));
  return res.status(201).json(newTalker);
});
// FINAL MINHAS IMPLEMENTAÇÕES

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
