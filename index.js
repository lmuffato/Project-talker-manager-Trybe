const express = require('express');
const bodyParser = require('body-parser');

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

const fs = require('fs').promises;

// 1 - Crie o endpoint GET /talker

app.get('/talker', async (_req, res) => {
  try {
    const content = await fs.readFile('./talker.json');
    const talker = JSON.parse(content);
    res.status(200).json(talker);
  } catch (e) {
    res.status(200).json([]);
  }
});

// 2 - Crie o endpoint GET /talker/:id

app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const content = await fs.readFile('./talker.json');
    const talker = JSON.parse(content);
    const talkerId = talker.findIndex((t) => t.id === +id);
    if (talkerId === -1) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } else {
      res.status(200).json(talker[talkerId]);
    }
});

// 3 - Crie o endpoint POST /login

const loginRouter = require('./loginRouter');

app.use('/login', loginRouter);

// 4 - Crie o endpoint POST /talker

const talkerRouter = require('./talkerRouter');

app.use('/talker', talkerRouter);

// 5 - Crie o endpoint PUT /talker/:id

const findToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  next();
};

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const findName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const findAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const findTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk) {
    return res.status(400).json({ message: 
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const checkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate > 5) {
    return res.status(400).json({ message: 
      'O campo "rate" deve ser um inteiro de 1 à 5' });
  } if (rate < 1) {
    return res.status(400).json({ message: 
      'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  
  if (!watchedAt || !rate) {
    return res.status(400).json({ message: 
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const checkWhachedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const datePattern = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

  if (datePattern.test(watchedAt) === false) {
    return res.status(400).json({ message: 
      'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } 
  next();
};

app.put('/talker/:id', findToken, checkToken, findName, checkName,
findAge, checkAge, findTalk, checkRate, checkTalk, checkWhachedAt,
 async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  // const content = await fs.readFile('./talker.json');
  // const talker = JSON.parse(content);
  const editedTalker = {
    name,
    age,
    id,
    talk: {
      rate,
      watchedAt,
    },
  };
  res.status(201).json(editedTalker);
});
