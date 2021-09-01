const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const loginRouter = require('./loginRouter');
const talkerRouter = require('./talkerRouter');

const app = express();
app.use(bodyParser.json());
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.use('/talker', talkerRouter);

app.use('/login', loginRouter);
// function tokenValidation(res, req, next) {
//   const { authorization } = req.headers;
  
//   if (!authorization) {
//     return res.status(401).json({ message: 'Token não encontrado' });
//   }
//   if (authorization.length !== 16) {
//     return res.status(401).json({ message: 'Token inválido' });
//   }
//   next();  
// }

function nameValidation(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 0) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function talkValidation(req, res, next) {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

function rateValidation(req, res, next) {
  const { talk: { rate } } = req.body; 
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

function watchedValidation(res, req, next) {
  const { talk: { watchedAt } } = req.body;
  const regex = /\n# $&:\n\t/;
  if (!regex.test(watchedAt) === false) {
    return res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}

app.post('/talker', nameValidation, 
  ageValidation, talkValidation, rateValidation, watchedValidation, async (req, res) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  const talkersList = await readFile();
  const createNewTalker = {
    name,
    age,
    talk,
    id: talkersList.length + 1,
  };
  talkersList.push(createNewTalker);
  await fs.writeFile(talkers, JSON.stringify(talkersList));
  return res.status(HTTP_OK_STATUS).json(createNewTalker);
});