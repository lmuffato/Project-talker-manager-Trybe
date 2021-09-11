const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const talker = async () => fs.readFile('./talker.json').then((res) => JSON.parse(res));
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// Req 1
app.get('/talker', async (_req, res) => {
  const respostaTalker = await talker(); 
  if (respostaTalker.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  } 
    return res.status(HTTP_OK_STATUS).json(respostaTalker);
});

// req 3
function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function validarEmail(req, res, next) {
  const { email } = req.body;
  const regexEmailValidade = /\S+@\S+\.\S+/;
  const tesEmailValido = regexEmailValidade.test(email);
  if (!email || email.length === 0) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  } if (!tesEmailValido) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
}

function validarPassword(req, res, next) {
  const { password } = req.body;
  
  if (!password || password.length === 0) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  } if (password.length <= 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
}

app.post('/login',
validarEmail,
validarPassword,
(_req, res) => {
  res.status(200).json({ token: generateToken() });
});

const verificarToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const verificarName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const verificarAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age.length === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const verificarWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const ModelData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  const verificarDAta = ModelData.test(watchedAt); 
  if (!verificarDAta) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const verificarRate = (req, res, next) => {
  const { rate } = req.body.talk; 
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const verificaTalkFull = (req, res, next) => {
  const { talk } = req.body;
  if ((!talk || !talk.watchedAt) || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  } 
  next();
};

app.get('/talker/search',
verificarToken,
async (req, res) => {
  const { q } = req.query;
  const respostaTalker = await talker();
  const filtered = respostaTalker.filter((e) => e.name.includes(q));
  if (!q || q.length === 0) {
    return res.status(200).json(respostaTalker);
  } if (filtered.length === 0) {
    return res.status(200).json([]);
  }
   return res.status(200).send(filtered);
});

app.put('/talker/:id', 
verificarToken,
verificarName,
verificarAge,
verificaTalkFull,
verificarWatchedAt,
verificarRate,
async (req, res) => {
  const { id } = req.params;
  const respostaTalker = await talker();
  const filtroTalker = respostaTalker.findIndex((e) => e.id === +(id));
  respostaTalker[filtroTalker] = { ...respostaTalker[filtroTalker], ...req.body };
  await fs.writeFile('./talker.json', JSON.stringify(respostaTalker));
  return res.status(200).json(respostaTalker[filtroTalker]);
});

app.delete('/talker/:id', 
verificarToken,
async (req, res) => {
  const { id } = req.params;
  const respostaTalker = await talker();
  const filtroTalker = respostaTalker.findIndex((e) => e.id === +(id));
  respostaTalker.splice(filtroTalker, 1);
  await fs.writeFile('./talker.json', JSON.stringify(respostaTalker));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const respostaTalker = await talker(); 
  const findTalker = respostaTalker.find((talk) => talk.id === +(id));
  if (!findTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(HTTP_OK_STATUS).json(findTalker);
});

app.post('/talker',
verificarToken,
verificarName,
verificarAge,
verificaTalkFull,
verificarWatchedAt,
verificarRate,
async (req, res) => {
  const respostaTalker = await talker(); 
  const creatObj = {
    id: respostaTalker.length + 1,
    ...req.body,
  };
  respostaTalker.push(creatObj);
  await fs.writeFile('./talker.json', JSON.stringify(respostaTalker));
  return res.status(201).json(creatObj);
});

app.listen(PORT, () => {
  console.log('Online');
});
